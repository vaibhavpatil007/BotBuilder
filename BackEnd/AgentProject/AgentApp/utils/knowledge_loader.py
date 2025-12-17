from langchain_community.document_loaders import PyPDFLoader
from langchain_core.documents import Document
import os

def load_agent_knowledge(agent):
    documents = []

    kb_items = agent.knowledge_base.all()

    for item in kb_items:
        # PDF documents
        if item.type == "document" and item.file:
            path = item.file.path
            if os.path.exists(path):
                try:
                    loader = PyPDFLoader(path)
                    pdf_docs = loader.load()
                    documents.extend(pdf_docs)
                except Exception as e:
                    print(f"Error loading PDF {path}: {e}")

        # FAQs
        elif item.type == "faq" and item.question and item.answer:
            faq_text = f"Question: {item.question}\nAnswer: {item.answer}"
            documents.append(Document(page_content=faq_text))

    return documents
