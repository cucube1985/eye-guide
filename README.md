# 눈에 담다 · 안과 진료 안내

안과 외래에서 환자·보호자와 함께 볼 수 있는 한국어 질환 설명 사이트입니다. 질환별 링크 공유, 검색·분류, 큰 글씨, 인쇄를 지원합니다. 회원가입이나 환자정보 입력은 없습니다.

## 포함된 안내

| 분류 | 내용 |
| --- | --- |
| 전안부 질환 | 결막염, 다래끼, 결막하 출혈, 눈물 흐름 |
| 백내장 | 질환, 수술 시점, 인공수정체, 수술 후 기대와 한계 |
| 녹내장 | 질환의 기본, 악화 판단, 치료 설명, 예후 설명 |
| 망막질환 | 망막박리, 망막전막, 황반변성, 중심장액맥락망막병증(CSC) |

각 안내에 핵심 설명, 증상·검사·치료, 생활 관리, 빨리 진료가 필요한 신호, FAQ와 공식 출처가 들어 있습니다. 의학 내용은 NEI, AAO, ASRS, NHS, CDC, NICE 등의 공식 자료를 바탕으로 작성한 초안이며, 자료 확인일은 **2026-10-25**입니다. 실제 사용 전 담당 의료진의 진료 방침에 맞게 검토·수정하세요. 개별 환자의 진단·치료 판단은 포함하지 않습니다.

## 실행

Node.js 22 이상에서 별도 패키지 설치 없이 실행합니다.

```powershell
npm run check
npm run dev
```

브라우저에서 `http://127.0.0.1:4173`을 여세요. ES 모듈을 사용하므로 `index.html`을 파일로 직접 열기보다 위 서버로 실행합니다.

## GitHub Pages로 공개

이 폴더의 **내용물 전체**를 GitHub 저장소의 최상위에 올리세요. 최상위에 `dist/`, `scripts/`, `.github/`, `package.json`이 있어야 합니다. 외부 라이브러리 설치나 빌드 과정은 없습니다.

1. GitHub에서 비어 있는 공개 저장소를 만듭니다.
2. 이 폴더를 저장소에 올리고 기본 브랜치를 `main`으로 지정합니다.
3. 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
4. **Actions → Publish patient guide to GitHub Pages → Run workflow**를 실행합니다. 이후 `main`에 올리는 수정은 자동으로 배포됩니다.
5. 완료된 배포의 `github-pages` 주소를 사용합니다. 보통 `https://계정명.github.io/저장소명/` 형태입니다.

GitHub CLI를 사용하는 경우 로그인 후 이 폴더에서 아래 명령으로 공개 저장소를 만들 수 있습니다. 이미 Git 저장소라면 `git init`을 다시 실행하지 않아도 됩니다. 기존 원격 저장소가 있다면 확인 후 사용하세요.

```powershell
gh auth login
git init -b main
git add dist scripts .github package.json README.md .gitignore
git commit -m "Add Korean ophthalmology patient guide"
gh repo create eye-guide --public --source . --remote origin --push
```

위 3단계의 Pages 설정을 마친 후 workflow를 실행합니다. `.openai/`는 Sites 호스팅 설정이므로 GitHub Pages에는 필요하지 않습니다.

주소의 `#/질환-id` 부분은 선택한 안내를 가리킵니다. 예: `https://계정명.github.io/eye-guide/#/glaucoma-progression`. GitHub Pages의 하위 경로에서도 동작하도록 모든 자산을 상대 경로로 연결했습니다.

## 내용 수정

- `dist/data/anterior.js`: 전안부 4개 + 백내장
- `dist/data/glaucoma.js`: 녹내장 4개
- `dist/data/retina.js`: 망막 4개
- `dist/app.js`: 화면과 검색·공유·페이지 동작
- `dist/styles.css`: 화면, 모바일, 큰 글씨, 인쇄 스타일

내용은 텍스트 데이터로 분리되어 있습니다. 항목을 추가할 때는 고유 `id`를 지정하고 `scripts/check.mjs`의 총 항목 수 검사와 화면의 항목 수 표기도 함께 갱신하세요. 문구를 수정한 후 `npm run check`로 필수 내용과 문법을 확인합니다.

인터넷 연결이 끊겨도 이미 제공된 설명과 그림은 외부 API에 의존하지 않습니다. Google Fonts를 불러오지 못하면 시스템 글꼴로 표시됩니다. 이 사이트는 쿠키, 분석 도구, 환자정보 저장 기능을 사용하지 않습니다.
