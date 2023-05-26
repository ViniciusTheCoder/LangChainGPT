import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { CustomExcelLoader } from '@/utils/customExcelLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import {
  JSONLoader,
  JSONLinesLoader,
} from 'langchain/document_loaders/fs/json';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';

const filePath = 'docs';

export const run = async () => {
  try {
    
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
      '.xlsx': path => new CustomExcelLoader(path),
      '.xls': path => new CustomExcelLoader(path),
      '.txt': (path) => new TextLoader(path),
      '.csv': (path) => new CSVLoader (path),
      '.docx': (path) => new DocxLoader (path),
      '.json': (path) => new JSONLoader (path, '/texts'),
      '.jsonl': (path) => new JSONLinesLoader (path, '/html'),
        });

    const rawDocs = await directoryLoader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); 

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
