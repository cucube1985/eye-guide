# 눈에 담다 · 안과 진료 안내

안과 외래에서 환자·보호자와 함께 보는 한국어 설명 사이트입니다. **6개 분류, 51개 안내**에 검색·분류, 큰 글씨, 인쇄, 질환별 링크 공유를 제공합니다. 환자정보를 입력하거나 저장하지 않습니다.

공개 사이트: https://eye-guide-clinic.cucube.chatgpt.site

GitHub 게시 대상: `cucube1985/eye-guide` (별도의 GitHub 쓰기 권한과 저장소 생성 필요)

## 포함된 설명

| 분류 | 항목 수 | 주요 내용 |
| --- | --- | --- |
| 전안부 질환 | 19 | 결막염의 유형, 다래끼·절개, 눈물, 안구건조증과 치료 6종, 눈꺼풀염·모낭충, 익상편, 각막염 |
| 백내장·노안 | 4 | 백내장, 수술 시기, 노안, 필로카르핀 안약 |
| 녹내장 | 7 | 기본, 유병률·위험 요인, 생활 습관, 악화 판단, 치료, 예후, 폐쇄각 |
| 망막질환 | 13 | 망막박리·전막, 황반변성·드루젠, CSC, 비문증, 당뇨망막병증과 치료, 황반부종, 정맥폐쇄, 황반원공 |
| 소아 안과 | 4 | 소아 근시, 유병률 참고표, 약시, 사시 |
| 기타 외래 질환 | 4 | 눈꺼풀 떨림, 포도막염, 안검하수, 속눈썹 찔림 |

2026-10-26에 제공된 원고를 반영했습니다. 표 11개와 설명 간 내부 링크 13개를 지원합니다. 기존 13개 항목의 공유 주소는 유지했습니다. 이번 작업은 모든 의료 문장·인용 수치를 새로 검증했다는 의미가 아닙니다. 일부 안전 관련 문구를 보완했으며 자세한 내용은 [반영 및 확인 내역](content/반영_및_확인_내역.md)을 참고하세요.

## 원고 편집과 실행

원고는 **`content/guide.md`** 한 파일에서 편집합니다. Node.js 22 이상에서 추가 패키지 설치 없이 실행합니다.

```powershell
npm run build
npm run check
npm run dev
```

- `build`: 원고의 제목·섹션을 읽어 `dist/data/topics.js`와 `dist/guide.md`를 생성합니다.
- `check`: 51개 설명, 원고와 생성 데이터 일치, 기존 주소, 표·내부 링크, Markdown 안전 처리와 문법을 확인합니다.
- `dev`: `http://127.0.0.1:4173`에서 사이트를 실행합니다.

`index.html`을 파일로 직접 여는 대신 로컬 서버를 사용하세요. 항목을 새로 추가할 때는 `scripts/import-guide.mjs`에 문서 번호와 고유 주소를 추가하고, 검사 스크립트의 예상 항목 수를 갱신합니다.

## GitHub Pages 게시

저장소는 `https://github.com/cucube1985/eye-guide`를 사용하도록 준비했습니다. 이 URL 자체는 업로드 완료나 권한을 의미하지 않습니다.

1. `cucube1985`로 로그인한 뒤 이름이 `eye-guide`인 공개 저장소를 만듭니다.
2. 이 폴더의 **내용물**을 저장소 최상위에 올립니다. `content/`, `dist/`, `scripts/`, `.github/`, `package.json` 등이 최상위에 있어야 합니다.
3. **Settings → Pages → Source**에서 **GitHub Actions**를 선택합니다.
4. **Actions → Publish patient guide to GitHub Pages → Run workflow**를 실행합니다.
5. 이후 `main` 브랜치 변경은 원고 생성·검사 후 자동 배포됩니다.

GitHub CLI로 게시하려면 이 폴더에서 아래 명령을 실행합니다. Sites용 Git 원격과 혼동하지 않도록 `github`라는 별도 원격 이름을 사용합니다. `gh auth status`에서 `cucube1985` 또는 해당 저장소에 쓰기 권한이 있는 계정인지 확인하세요.

```powershell
gh auth login --hostname github.com --git-protocol https
gh auth status
git add content dist scripts .github package.json README.md THIRD_PARTY_NOTICES.md .gitignore
git commit -m "Expand Korean ophthalmology guide to 51 topics"
gh repo create cucube1985/eye-guide --public --source . --remote github --push
```

이미 저장소를 만들었다면 `gh repo create` 대신 다음 명령을 사용합니다. 기존에 `github` 원격이 있다면 먼저 `git remote -v`로 확인하고 중복 추가하지 마세요.

```powershell
git remote add github https://github.com/cucube1985/eye-guide.git
git push github HEAD:main
```

Sites에서 만든 기본 브랜치가 `main`이 아닐 수 있으므로, 배포 브랜치는 `HEAD:main`으로 명시합니다. 새 저장소를 CLI로 만드는 경우에도 첫 push 후 GitHub 기본 브랜치와 workflow의 `main` 일치 여부를 확인하세요. `.openai/`는 Sites 설정이므로 GitHub Pages에는 필요하지 않습니다.

GitHub Pages 게시 주소는 설정 완료 후 보통 `https://cucube1985.github.io/eye-guide/`입니다. 공유 예: `https://cucube1985.github.io/eye-guide/#/glaucoma-progression`. 상대 자산 경로와 해시 주소를 사용하므로 저장소 하위 경로에서도 동작합니다.

## 화면과 라이브러리

- `dist/app.js`: 분류·검색·공유·글씨 크기·경로 처리
- `dist/views.js`: 원고 섹션과 목차 표시
- `dist/markdown.js`: 표·강조·목록·문서 간 연결과 안전한 Markdown 렌더링
- `dist/styles.css`: 일반·모바일·큰 글씨·인쇄 스타일
- `dist/vendor/`: 사이트에 포함한 markdown-it 15.0.3 및 MIT 라이선스

Markdown의 원시 HTML은 실행하지 않습니다. 외부 링크는 별도 창으로 열고 `noopener noreferrer`를 적용합니다. 라이브러리는 외부 CDN 대신 사이트 안에서 제공합니다. Google Fonts를 불러오지 못하면 시스템 글꼴을 사용합니다. [외부 라이브러리 고지](THIRD_PARTY_NOTICES.md)를 포함합니다.
