from flask import Flask, render_template, request, Response, stream_with_context
from sms_bomber import SMSBomber
import json
import time
import os

app = Flask(__name__)
bomber = SMSBomber()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/bomb', methods=['POST'])
def bomb():
    mobile = request.form.get('mobile')
    count = int(request.form.get('count', 10))
    speed = request.form.get('speed', 'fast')
    country_code = request.form.get('cc', '91')

    def generate():
        gen = bomber.attack_generator(mobile, count, country_code, speed)
        for event in gen:
            # Yield as Server-Sent Event data
            yield f"data: {json.dumps(event)}\n\n"
    
    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == '__main__':
    # Localhost only for security
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
