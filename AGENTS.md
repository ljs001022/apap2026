<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Python Script Restriction Rule

- 유저가 명시적으로 분석이나 실행을 요청하는 경우를 제외하고는, 임의로 파이썬 스크립트(또는 스크래치 스크립트)를 작성하거나 실행하는 행동을 전면 금지합니다.
- 탐색, 파일 정보 획득, 디버깅 등 모든 과정에서 파이썬 스크립트를 생성하여 실행하는 행위를 금하고, 파일 읽기/수정 도구나 터미널 기본 명령어 등 지정된 표준 도구만을 사용해야 합니다.
