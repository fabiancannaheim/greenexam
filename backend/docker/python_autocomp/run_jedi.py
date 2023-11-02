import json
import sys
import jedi

def autocomplete(code, line, column):
    interpreter = jedi.Interpreter(code, [{}])
    completions = interpreter.complete(line, column)
    return [c.name for c in completions]

if __name__ == '__main__':
    try:
        # Read the input data from stdin
        input_data = json.loads(sys.stdin.read())
        
        # Extract code, line, and column
        code = input_data['code']
        line = int(input_data['line'])
        column = int(input_data['col'])
        
        # Get autocomplete suggestions
        suggestions = autocomplete(code, line, column)
        
        # Print suggestions as JSON
        print(json.dumps(suggestions))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
