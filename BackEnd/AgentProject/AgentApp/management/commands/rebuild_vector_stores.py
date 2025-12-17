from django.core.management.base import BaseCommand
from AgentApp.models import Agent
from AgentApp.utils.knowledge_loader import load_agent_knowledge
from AgentApp.utils.vector_store import build_agent_vector_store

class Command(BaseCommand):
    help = 'Rebuilds vector stores for all agents'

    def handle(self, *args, **kwargs):
        agents = Agent.objects.all()
        for agent in agents:
            self.stdout.write(f"Processing agent: {agent.name} (ID: {agent.id})")
            try:
                documents = load_agent_knowledge(agent)
                if documents:
                    build_agent_vector_store(agent, documents)
                    self.stdout.write(self.style.SUCCESS(f"Successfully rebuilt vector store for agent {agent.name}"))
                else:
                    self.stdout.write(self.style.WARNING(f"No documents found for agent {agent.name}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error processing agent {agent.name}: {e}"))
