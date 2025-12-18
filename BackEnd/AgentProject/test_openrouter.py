import os
from langchain_openai import ChatOpenAI

api_key = "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"

llm = ChatOpenAI(
    model="nex-agi/deepseek-v3.1-nex-n1:free",
    openai_api_key=api_key,
    openai_api_base="https://openrouter.ai/api/v1",
    temperature=0
)

try:
    response = llm.invoke("Hello, are you working?")
    print(response.content)
except Exception as e:
    print(f"Error: {e}")
