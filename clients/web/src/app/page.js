import React from 'react';
import Link from 'next/link';

async function fetchConversations() {
  const response = await fetch(`http://localhost:3000/api/conversations`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }
  const data = await response.json();
  console.log(data);
  return data.conversations;
}


const ConversationsList = async () => {
  const conversations = await fetchConversations();

  return (
    <div className="min-h-screen bg-black py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center mb-10 text-white">Conversations</h1>
            <div className="space-y-6">
                {conversations.map((conversation) => (
                    <Link 
                      href={`/conversations/${conversation.id}`} 
                      key={conversation.id} 
                      className="block transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl" 
                      passHref
                    >
                        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
                            <h5 className="text-2xl font-bold tracking-tight text-white">{conversation.short_summary}</h5>
                            <p className="font-normal text-gray-400 mt-2">{new Date(conversation.start_time).toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
);
};

export default ConversationsList;