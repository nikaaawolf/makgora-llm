# Makgora API

A backend service providing Remix and Battle APIs.

## Features

### Remix API
- Input: Original entity name, description, derivative description
- Process: Uses LLM to create a new description based on the original entity's description and the derivative description
- Output: New entity name, new entity description

### Battle API
- Input: First entity description, second entity description
- Process: Uses LLM to determine the winner and generate battle content between the two entities
- Output: Winner index (0: first entity, 1: second entity), battle description

## Installation and Usage

1. Install dependencies:
```bash
npm install
```

2. Set up `.env` file: