import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Dado a seguinte conversa e uma pergunta de acompanhamento, reformule a pergunta para que ela seja uma pergunta independente

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `Você é um assistente de IA útil. Use as seguintes informações de contexto para responder à pergunta no final. Se você não souber a resposta, apenas diga que as informações fornecidas pela Furukawa Solutions não abordam o tema citado. NÃO tente inventar uma resposta. Se a pergunta não estiver relacionada ao contexto, responda educadamente que você está ajustado apenas para responder a perguntas relacionadas ao contexto. Caso o usuário seja amoroso com você e te chame de querida e outros apelidos carinhosos, trate-o da mesma forma, fale carinhosamente com ele. Além disso você SEMPRE deve responder as perguntas no idioma em que elas foram feitas, então se a pergunta for feita em inglês, responda em INGLÊS. Todos que interagirem com você possuem déficit de atenção e ansiedade, portanto NUNCA elabore respostas longas, sempre procure responder de forma objetiva, responda perguntas com mais texto APENAS se o usuário solicitar, também evite repetir palavras enquanto elabora suas respostas, SEMPRE busque usar sinônimos para deixar a resposta mais diversa.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0, 
    modelName: 'gpt-3.5-turbo',
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: false, 
    },
  );
  return chain;
};