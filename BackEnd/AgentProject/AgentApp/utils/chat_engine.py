from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain_community.vectorstores import FAISS
from django.conf import settings
import os

SYSTEM_PROMPT = """
You are a company policy assistant.
Answer ONLY using the provided context.
If the answer is not present, say:
"This information is not available in company policies."
"""

def get_bot_response(agent_id, user_message):
    # Use same embedding model as vector_store.py
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )
    
    vector_store_path = os.path.join(settings.MEDIA_ROOT, 'vector_stores', f"agent_{agent_id}")

    if not os.path.exists(vector_store_path):
         return "I haven't been trained on any documents yet."

    try:
        db = FAISS.load_local(
            vector_store_path,
            embeddings,
            allow_dangerous_deserialization=True
        )

        docs = db.similarity_search(user_message, k=3)
        context = "\n\n".join([d.page_content for d in docs])

        # Use OpenRouter via ChatOpenAI
        llm = ChatOpenAI(
            model="nex-agi/deepseek-v3.1-nex-n1:free",
            openai_api_key="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",
            openai_api_base="https://openrouter.ai/api/v1",
            temperature=0
        )

        prompt = f"""
{SYSTEM_PROMPT}

Context:
{context}

User Question:
{user_message}
"""
        response = llm.invoke(prompt)
        return response.content
    except Exception as e:
        print(f"Error generating response: {e}")
        return "I encountered an error processing your request."
