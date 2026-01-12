// 边缘函数处理AI请求，避免浏览器直接调用OpenAI
export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    
    if (request.method === 'POST') {
      return handleChatRequest(request);
    }
    
    return new Response('Method not allowed', { status: 405 });
  },
};

async function handleChatRequest(request) {
  try {
    const { messages } = await request.json();
    
    // 使用ESA环境变量存储API密钥
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ESA_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 1000,
      }),
    });
    
    const data = await openaiResponse.json();
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
