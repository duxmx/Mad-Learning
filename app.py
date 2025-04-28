from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Serve static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Serve index.html for the root route
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("""
    ===============================================
    🚀 Mad Learning with Vision App running!
    
    📱 Open http://localhost:{} in your browser
    
    🔍 Point your camera at objects and press spacebar
       to identify them and hear fun rhymes!
    ===============================================
    """.format(port))
    app.run(host='0.0.0.0', port=port, debug=True)
