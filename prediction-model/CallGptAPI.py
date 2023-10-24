import os.path
import re
from llama_index import VectorStoreIndex, Document
from llama_index import StorageContext, load_index_from_storage
from google.cloud import dialogflow
from google.protobuf.json_format import MessageToDict
import openai
from utils import *
from QueryTemplate import *

"Extract keyword with NER"


def detect_intent_texts_with_location(
        project_id, location_id, session_id, texts, language_code, cursor
):
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""

    session_client = dialogflow.SessionsClient(
        client_options={"api_endpoint": f"{location_id}-dialogflow.googleapis.com"}
    )

    session = (
        f"projects/{project_id}/locations/{location_id}/agent/sessions/{session_id}"
    )
    print(f"Session path: {session}\n")

    for text in texts:
        text_input = dialogflow.TextInput(text=text, language_code=language_code)

        query_input = dialogflow.QueryInput(text=text_input)

        response = session_client.detect_intent(
            request={"session": session, "query_input": query_input}
        )
        intent = response.query_result.intent.display_name
        print('intent', intent)
        if intent == 'programs_language_requirement':
            response_program = response.query_result.parameters.pb['programs']
            pro_name = MessageToDict(response_program)
            # 正则表达式匹配需要完善
            pro_name = re.sub(r'^[ /\\"]+|[ /\\"]+$', '', pro_name)
            print(pro_name)
            response_univ = response.query_result.parameters.pb['university']
            univ_name = MessageToDict(response_univ)
            univ_name = re.sub(r'^[ /\\"]+|[ /\\"]+$', '', univ_name)
            print(univ_name)

            keyword = [univ_name, pro_name]
            # display_language_requirement("Australian Catholic University", "Master of Public Health")
            prompt = query_entry_criteria(keyword, cursor)

        elif intent == 'project_description':
            print(intent)
            response_program = response.query_result.parameters.pb['programs']
            pro_name = MessageToDict(response_program)
            # 正则表达式匹配需要完善
            pro_name = re.sub(r'^[ /\\"]+|[ /\\"]+$', '', pro_name)
            print(pro_name)
            response_univ = response.query_result.parameters.pb['university']
            univ_name = MessageToDict(response_univ)
            univ_name = re.sub(r'^[ /\\"]+|[ /\\"]+$', '', univ_name)
            print(univ_name)

            # display_language_requirement("Australian Catholic University", "Master of Public Health")
            keyword = [univ_name, pro_name]
            prompt = query_entry_criteria(keyword, cursor)

        else:
            prompt = 'Please answer the question based on your knowledge base.'
        # print(response.query_result.parameters.pb['university']['string_value'])

        # print("=" * 20)
        # print(f"Query text: {response.query_result.query_text}")
        # print(
        #     f"Detected intent: {response.query_result.intent.display_name} (confidence: {response.query_result.intent_detection_confidence,})\n"
        # )
        # print(f"Fulfillment text: {response.query_result.fulfillment_text}\n")
        # if response.query_result.intent.display_name=='programs_language_requirement':
        return prompt


def call_gpt(user_id, question, prompt, context_load=True, context_save=True, ):
    memory_path = os.path.join(f"./storage/{user_id}")
    if context_load:
        # rebuild storage context
        storage_context = StorageContext.from_defaults(persist_dir=memory_path)
        # load index
        index = load_index_from_storage(storage_context)
        print('rebuild storage context and load index.')
        new_doc = Document(text=prompt)
        index.insert(new_doc)
    else:
        texts = ['You are a helpful study advisor for international students.', prompt]
        documents = [Document(text=t) for t in texts]
        index = VectorStoreIndex.from_documents(documents)

    query_engine = index.as_query_engine()
    response = query_engine.query(question)

    "store session"
    if context_save:
        index.insert(Document(text=question))
        index.storage_context.persist(persist_dir=memory_path)
        print('save storage context.')

    return response


def chat_with_gpt_session(user_id, cursor):
    api_key = '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'
    openai.api_key = api_key

    while True:
        question = input("quesiton: ")
        memory_load = os.path.exists('./storage/' + user_id)
        print('memory load? ', memory_load)
        prompt = detect_intent_texts_with_location('studyabroad-wocb', 'global', 'a0be3e56-9fcf-153a-d408-c380b8fb58c8',
                                                   [question], 'en', cursor)
        response = call_gpt(user_id, question, prompt, context_load=memory_load, context_save=True)
        print('gpt: ', response)


def chat_with_gpt(question, user_id, session_id, cursor, context_load, context_save):
    prompt = detect_intent_texts_with_location('studyabroad-wocb', 'global', session_id,
                                               [question], 'en', cursor)
    response = call_gpt(user_id, question, prompt, context_load, context_save)

    return response


if __name__ == '__main__':
    user_id = '111111'
    cursor = connect_database()
    chat_with_gpt_session(user_id, cursor)
    # api_key = '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'
    # openai.api_key = api_key
    #
    # user_id = '111111'
    # while True:
    #     prompt = input("prompt: ")
    #     question = input("quesiton: ")
    #     memory_load = os.path.exists('./storage/' + user_id)
    #     print('memory load? ', memory_load)
    #     response = call_gpt(user_id, question, prompt, memory_load=memory_load, memory_save=True)
    #     print('gpt: ', response)
