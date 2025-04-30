from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

# Токен вашего бота
BOT_TOKEN = os.getenv('BOT_TOKEN')
# URL вашего n8n вебхука
N8N_WEBHOOK_URL = os.getenv('N8N_WEBHOOK_URL')

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.json
        chat_id = data.get('chat_id')
        message = data.get('message')
        lesson_id = data.get('lesson_id')
        lesson_title = data.get('lesson_title')

        # Отправляем сообщение через Telegram Bot API
        telegram_url = f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage'
        telegram_data = {
            'chat_id': chat_id,
            'text': message
        }
        requests.post(telegram_url, json=telegram_data)

        # Отправляем данные в n8n
        n8n_data = {
            'type': 'text',
            'source': 'webapp',
            'message': message,
            'lessonId': lesson_id,
            'lessonTitle': lesson_title
        }
        requests.post(N8N_WEBHOOK_URL, json=n8n_data)

        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 