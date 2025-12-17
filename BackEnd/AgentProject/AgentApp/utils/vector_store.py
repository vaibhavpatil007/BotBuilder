from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from django.conf import settings
import os

def build_agent_vector_store(agent, documents):
    if not documents:
        return

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150
    )

    chunks = splitter.split_documents(documents)
    
    # Use standard free HuggingFace model (runs locally)
    embeddings = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2",
        model_kwargs={'device': 'cpu'}
    )

    vector_db = FAISS.from_documents(chunks, embeddings)
    
    # Save to a dedicated folder in MEDIA_ROOT
    vector_store_path = os.path.join(settings.MEDIA_ROOT, 'vector_stores', f"agent_{agent.id}")
    os.makedirs(vector_store_path, exist_ok=True)
    
    vector_db.save_local(vector_store_path)
    print(f"Vector store saved for agent {agent.id} at {vector_store_path}")
