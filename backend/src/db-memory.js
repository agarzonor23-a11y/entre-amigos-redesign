// In-memory database for development/testing
// This simulates PostgreSQL without needing an actual database

const conversations = new Map();
const messages = new Map();

// Simulate PostgreSQL's query interface
const query = async (text, params = []) => {
    // Parse basic SQL commands
    const sql = text.trim().toLowerCase();

    // INSERT INTO ai_conversations
    if (sql.includes('insert into ai_conversations')) {
        const [id, userIdentifier, simulatorData] = params;
        conversations.set(id, {
            id,
            user_identifier: userIdentifier,
            simulator_data: simulatorData,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return { rows: [], rowCount: 1 };
    }

    // INSERT INTO ai_messages
    if (sql.includes('insert into ai_messages')) {
        const [conversationId, role, content] = params;
        const messageId = messages.size + 1;
        const message = {
            id: messageId,
            conversation_id: conversationId,
            role,
            content,
            created_at: new Date(),
        };

        if (!messages.has(conversationId)) {
            messages.set(conversationId, []);
        }
        messages.get(conversationId).push(message);
        return { rows: [], rowCount: 1 };
    }

    // UPDATE ai_conversations
    if (sql.includes('update ai_conversations')) {
        const [simulatorData, conversationId] = params;
        const conversation = conversations.get(conversationId);
        if (conversation) {
            conversation.simulator_data = simulatorData;
            conversation.updated_at = new Date();
        }
        return { rows: [], rowCount: 1 };
    }

    // SELECT messages
    if (sql.includes('select role, content from ai_messages')) {
        const conversationId = params[0];
        const conversationMessages = messages.get(conversationId) || [];
        return {
            rows: conversationMessages.map(m => ({
                role: m.role,
                content: m.content,
                created_at: m.created_at,
            })),
            rowCount: conversationMessages.length,
        };
    }

    // SELECT conversation
    if (sql.includes('select * from ai_conversations')) {
        const conversationId = params[0];
        const conversation = conversations.get(conversationId);
        return {
            rows: conversation ? [conversation] : [],
            rowCount: conversation ? 1 : 0,
        };
    }

    // Default: return empty result
    return { rows: [], rowCount: 0 };
};

module.exports = {
    query,
};
