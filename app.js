/**
 * ==============================================================================
 * [app.js] 이베리아 트래블 마스터 오픈위키 코어 엔진 (모바일 반응형 최적화)
 * ==============================================================================
 * 본 스크립트는 다음 기능을 전담합니다:
 * 1. 3종 뷰어 모드(원문/요약/병기) 동적 렌더링 엔진
 * 2. 사이드바 반응형 제어 (데스크톱 드래그 리사이징 & 모바일 슬라이드 드로어 제어)
 * 3. 3종 테마, 서체, 폰트 크기 상태 영구 관리
 * 4. 무결점 실시간 형광펜 & 밑줄 & 메모 주석 엔진 (모바일 터치 경계 계산, Range 래핑, 자동 복원)
 * 5. 개인화 학습 보관함 (필터링, 검색, JSON 백업/복원)
 * 6. 실무 보조 인터랙티브 도구 (환율/경비 계산기, 35종 상세 체크리스트, 회화 음성 TTS, 긴급망)
 * 7. 비상용 마스터 페이퍼 입력 & 인쇄 프리뷰
 * 8. 스마트 플로팅 탑 버튼 (250px 스크롤 감지, SVG 프로그레스 링 렌더링)
 * ==============================================================================
 */

// =============================================================================
// [상태 관리 State Manager] 애플리케이션 전역 상태 객체
// =============================================================================
const WikiState = {
  // 현재 뷰어 모드: 'original' (원문), 'summary' (요약), 'dual' (병기)
  currentView: localStorage.getItem("wiki_view_mode") || "original",

  // 테마: 'light', 'dark', 'sepia'
  currentTheme: localStorage.getItem("wiki_theme") || "light",

  // 서체: 'sans' (고딕), 'serif' (명조)
  currentFont: localStorage.getItem("wiki_font") || "sans",

  // 폰트 크기: 'normal' (16px), 'large' (18px), 'xlarge' (20px)
  currentFontSize: localStorage.getItem("wiki_font_size") || "normal",

  // 사이드바 너비 (px, 데스크톱용)
  sidebarWidth: parseInt(localStorage.getItem("wiki_sidebar_width"), 10) || 320,

  // 저장된 주석(형광펜, 밑줄, 메모) 목록
  annotations: JSON.parse(localStorage.getItem("wiki_annotations") || "[]"),

  // 체크리스트 체크된 항목 ID 목록
  checkedItems: JSON.parse(localStorage.getItem("wiki_checked_items") || "[]"),

  // 사용자가 직접 추가한 커스텀 준비물 목록
  customChecklist: JSON.parse(localStorage.getItem("wiki_custom_checklist") || "[]"),

  // 체크리스트 현재 선택된 카테고리 필터 ('all' 또는 특정 카테고리)
  currentChecklistFilter: "all",

  // 비상용 마스터 페이퍼 저장 데이터
  masterPaperData: JSON.parse(localStorage.getItem("wiki_master_paper") || "{}"),

  // 현재 편집 중인 주석 객체 임시 참조
  activeAnnotationId: null,

  // 현재 브라우저 텍스트 드래그 선택 범위(Range) 보관
  currentSelectionRange: null
};

// =============================================================================
// [초기화 Initialization] DOM 로드 완료 시 실행되는 진입점
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. 저장된 설정 복원 (테마, 폰트, 서체, 사이드바 너비)
  applySavedPreferences();

  // 2. 사이드바 목차(TOC) 렌더링
  renderSidebarNav();

  // 3. 본문 챕터 렌더링 (현재 뷰 모드 기준)
  renderChapters();

  // 4. 저장된 주석(형광펜/밑줄) 본문 자동 복원
  restoreAllAnnotations();

  // 5. 사이드바 리사이저 및 모바일 드로어 이벤트 바인딩
  initSidebarResizer();

  // 6. 상단 글로벌 컨트롤러 이벤트 바인딩 (모바일 메뉴 포함)
  initHeaderControls();

  // 7. 실시간 텍스트 드래그 플로팅 툴바 바인딩
  initFloatingAnnotationToolbar();

  // 8. 플로팅 탑(Top) 버튼 & 스크롤 진행률 연동
  initScrollAndTopButton();

  // 9. 실무 보조 도구(계산기, 체크리스트, TTS, 연락망) 초기화
  initQuickTools();

  // 10. 비상용 마스터 페이퍼 데이터 복원 및 이벤트 바인딩
  initMasterPaper();

  // 11. 키보드 단축키 (←, → 챕터 이동, ESC 모달 닫기) 바인딩
  initKeyboardShortcuts();

  // 12. 전체 주석 개수 배지 업데이트
  updateGlobalAnnotationCount();
});

// =============================================================================
// 1. 설정 복원 및 환경 적용
// =============================================================================
function applySavedPreferences() {
  document.documentElement.setAttribute("data-theme", WikiState.currentTheme);
  document.documentElement.setAttribute("data-font", WikiState.currentFont);
  document.documentElement.setAttribute("data-font-size", WikiState.currentFontSize);

  // 헤더 컨트롤 버튼 활성화 상태 동기화
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === WikiState.currentTheme);
  });
  document.querySelectorAll(".font-family-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.font === WikiState.currentFont);
  });
  document.querySelectorAll(".font-size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.size === WikiState.currentFontSize);
  });
  document.querySelectorAll(".view-mode-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === WikiState.currentView);
  });

  // 사이드바 너비 복원 (데스크톱 너비 기준)
  if (window.innerWidth > 768) {
    const sidebar = document.getElementById("wiki-sidebar");
    if (sidebar) {
      const safeWidth = Math.max(220, Math.min(600, WikiState.sidebarWidth));
      sidebar.style.width = `${safeWidth}px`;
    }
  }
}

// =============================================================================
// 2. 사이드바 목차(TOC) 렌더링 & 실시간 검색 필터링 (모바일 연동)
// =============================================================================
function renderSidebarNav() {
  const navContainer = document.getElementById("sidebar-nav");
  if (!navContainer) return;

  navContainer.innerHTML = wikiChapters.map((chap, idx) => {
    // 해당 챕터에 저장된 주석 개수 카운트
    const count = WikiState.annotations.filter(a => a.chapterId === chap.id).length;
    const badgeHtml = count > 0 ? `<span class="nav-badge-note">${count}</span>` : "";

    return `
      <a href="#${chap.id}" class="nav-item ${idx === 0 ? 'active' : ''}" data-target="${chap.id}" id="nav-item-${chap.id}">
        <div class="nav-title-wrap">
          <span class="nav-number">${chap.number}</span>
          <span class="nav-text">${chap.shortTitle}</span>
        </div>
        <div class="nav-badges">
          ${badgeHtml}
        </div>
      </a>
    `;
  }).join("");

  // 클릭 시 스무스 스크롤 이동 및 모바일에서 사이드바 드로어 자동 닫기
  navContainer.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        navContainer.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
        item.classList.add("active");

        // 모바일 화면에서는 선택 후 사이드바 드로어 자동 닫기
        if (window.innerWidth <= 768) {
          closeMobileSidebar();
        }
      }
    });
  });

  // 검색창 입력 이벤트 바인딩
  const searchInput = document.getElementById("wiki-search-input");
  const clearBtn = document.getElementById("clear-search-btn");
  if (searchInput && clearBtn) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      clearBtn.style.display = query ? "block" : "none";
      filterChaptersByQuery(query);
    });

    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      clearBtn.style.display = "none";
      filterChaptersByQuery("");
      searchInput.focus();
    });
  }
}

// 검색어에 따른 본문 및 사이드바 필터링
function filterChaptersByQuery(query) {
  wikiChapters.forEach(chap => {
    const cardEl = document.getElementById(chap.id);
    const navEl = document.getElementById(`nav-item-${chap.id}`);
    if (!cardEl) return;

    if (!query) {
      cardEl.style.display = "block";
      if (navEl) navEl.style.display = "flex";
      return;
    }

    const titleMatch = chap.title.toLowerCase().includes(query);
    const contentMatch = chap.contentHtml.toLowerCase().includes(query);
    const summaryMatch = chap.summary.keyPoints.some(k => k.label.toLowerCase().includes(query) || k.desc.toLowerCase().includes(query));

    const isMatch = titleMatch || contentMatch || summaryMatch;
    cardEl.style.display = isMatch ? "block" : "none";
    if (navEl) navEl.style.display = isMatch ? "flex" : "none";
  });
}

// =============================================================================
// 3. 본문 챕터 렌더링 (원문 / 요약 / 병기 3종 뷰 완벽 대응)
// =============================================================================
function renderChapters() {
  const container = document.getElementById("wiki-content-container");
  if (!container) return;

  container.className = `view-${WikiState.currentView}`;

  container.innerHTML = wikiChapters.map(chap => {
    // 요약 카드 HTML 생성
    const summaryHtml = `
      <div class="summary-container">
        <div class="summary-card">
          ${chap.summary.coreMessage ? `<div class="summary-core-message"><strong>핵심 요약:</strong> ${chap.summary.coreMessage}</div>` : ''}
          <div class="summary-keypoints-list">
            ${chap.summary.keyPoints.map(kp => `
              <div class="keypoint-item">
                <span class="keypoint-label">📌 ${kp.label}</span>
                <span class="keypoint-desc">${kp.desc}</span>
              </div>
            `).join("")}
          </div>
          ${chap.summary.actionItems ? `
            <div class="summary-actions-box">
              <div class="summary-actions-title">⚡ 실무 행동 요령 (Action Items)</div>
              <ul class="summary-actions-list">
                ${chap.summary.actionItems.map(item => `<li>${item}</li>`).join("")}
              </ul>
            </div>
          ` : ''}
          ${chap.summary.proTip ? `
            <div class="summary-protip-box">
              <span>💡</span>
              <div><strong>전문가 꿀팁:</strong> ${chap.summary.proTip}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // 원문 HTML 생성
    const originalHtml = `
      <div class="original-container">
        ${chap.contentHtml}
      </div>
    `;

    return `
      <article class="wiki-chapter-card" id="${chap.id}" data-chapter-id="${chap.id}">
        <header class="chapter-header">
          <div class="chapter-badge-row">
            <span class="chapter-cat-badge">${chap.category}</span>
            <span class="chapter-action-badge">${chap.badge}</span>
          </div>
          <h2 class="chapter-title">${chap.title}</h2>
        </header>

        <div class="chapter-body-split">
          ${summaryHtml}
          ${originalHtml}
        </div>
      </article>
    `;
  }).join("");
}

// =============================================================================
// 4. 사이드바 리사이저 & 모바일 드로어 제어
// =============================================================================
function initSidebarResizer() {
  const resizer = document.getElementById("sidebar-resizer");
  const sidebar = document.getElementById("wiki-sidebar");
  if (!resizer || !sidebar) return;

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  // 마우스 누름: 리사이징 시작 (데스크톱 전용)
  resizer.addEventListener("mousedown", (e) => {
    if (window.innerWidth <= 768) return;
    isResizing = true;
    startX = e.clientX;
    startWidth = sidebar.getBoundingClientRect().width;
    document.body.classList.add("resizing-active");
    e.preventDefault();
  });

  // 마우스 이동: 실시간 너비 변경 (220px ~ 600px 안전 범위 제한)
  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(220, Math.min(600, startWidth + deltaX));
    sidebar.style.width = `${newWidth}px`;
    WikiState.sidebarWidth = newWidth;
  });

  // 마우스 뗌: 리사이징 종료 및 로컬스토리지 영구 보존
  document.addEventListener("mouseup", () => {
    if (isResizing) {
      isResizing = false;
      document.body.classList.remove("resizing-active");
      localStorage.setItem("wiki_sidebar_width", WikiState.sidebarWidth);
    }
  });

  // 더블 클릭: 320px 기본값 즉시 복원
  resizer.addEventListener("dblclick", () => {
    if (window.innerWidth <= 768) return;
    const defaultWidth = 320;
    sidebar.style.width = `${defaultWidth}px`;
    WikiState.sidebarWidth = defaultWidth;
    localStorage.setItem("wiki_sidebar_width", defaultWidth);
  });
}

// 모바일 사이드바 열기/닫기 도우미 함수
function toggleMobileSidebar() {
  document.body.classList.toggle("sidebar-open");
}
function closeMobileSidebar() {
  document.body.classList.remove("sidebar-open");
}

// =============================================================================
// 5. 상단 헤더 컨트롤 바인딩 (모바일 메뉴 & 백드롭 포함)
// =============================================================================
function initHeaderControls() {
  // 모바일 햄버거 토글 버튼
  const toggleBtn = document.getElementById("sidebar-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMobileSidebar);
  }

  // 모바일 사이드바 닫기 버튼
  const closeBtn = document.getElementById("sidebar-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileSidebar);
  }

  // 모바일 백드롭 클릭 시 닫기
  const backdrop = document.getElementById("sidebar-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", closeMobileSidebar);
  }

  // 3종 뷰 모드 스위처
  document.querySelectorAll(".view-mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (WikiState.currentView === view) return;

      WikiState.currentView = view;
      localStorage.setItem("wiki_view_mode", view);

      document.querySelectorAll(".view-mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // 뷰 모드 변경 시 본문 컨테이너 갱신 및 주석 자동 재복원
      const container = document.getElementById("wiki-content-container");
      if (container) {
        container.className = `view-${view}`;
      }
      restoreAllAnnotations();
    });
  });

  // 텍스트 크기 조절
  document.querySelectorAll(".font-size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const size = btn.dataset.size;
      WikiState.currentFontSize = size;
      localStorage.setItem("wiki_font_size", size);
      document.documentElement.setAttribute("data-font-size", size);
      document.querySelectorAll(".font-size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 서체 변경 (고딕 / 명조)
  document.querySelectorAll(".font-family-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const font = btn.dataset.font;
      WikiState.currentFont = font;
      localStorage.setItem("wiki_font", font);
      document.documentElement.setAttribute("data-font", font);
      document.querySelectorAll(".font-family-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 3종 테마 스위처 (라이트 / 다크 OLED / 세피아)
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      WikiState.currentTheme = theme;
      localStorage.setItem("wiki_theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // 실무 도구 모달 열기 버튼
  const openToolsBtn = document.getElementById("open-tools-btn");
  if (openToolsBtn) {
    openToolsBtn.addEventListener("click", openToolsModal);
  }

  // 개인화 학습 보관함 모달 열기 버튼
  const openNotebookBtn = document.getElementById("open-notebook-btn");
  if (openNotebookBtn) {
    openNotebookBtn.addEventListener("click", openNotebookModal);
  }
}

// =============================================================================
// 6. 실시간 텍스트 드래그 플로팅 툴바 & 하이라이트/주석 엔진 (모바일 터치 최적화)
// =============================================================================
function initFloatingAnnotationToolbar() {
  const toolbar = document.getElementById("annotation-floating-toolbar");
  if (!toolbar) return;

  // 마우스/터치 선택 감지 (mouseup, touchend)
  document.addEventListener("mouseup", handleSelectionChange);
  document.addEventListener("touchend", () => {
    setTimeout(handleSelectionChange, 150);
  });
  document.addEventListener("keyup", handleSelectionChange);

  // 본문 바깥 터치/클릭 시 툴바 숨김
  document.addEventListener("mousedown", (e) => {
    if (!toolbar.contains(e.target) && !e.target.closest(".wiki-highlight") && !e.target.closest(".underline-line")) {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          toolbar.style.display = "none";
        }
      }, 100);
    }
  });

  // 형광펜 5종 클릭 이벤트
  toolbar.querySelectorAll(".hl-color-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const color = btn.dataset.color;
      applyAnnotation({ type: "highlight", style: color });
    });
  });

  // 밑줄 3종 클릭 이벤트
  toolbar.querySelectorAll(".underline-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const underlineStyle = btn.dataset.underline;
      applyAnnotation({ type: "underline", style: underlineStyle });
    });
  });

  // 메모(📝) 버튼 클릭 시
  const memoBtn = document.getElementById("tb-memo-btn");
  if (memoBtn) {
    memoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const ann = applyAnnotation({ type: "highlight", style: "#FEF08A", openModal: true });
      if (ann) {
        openMemoModalById(ann.id);
      }
    });
  }

  // 지우개(🧹) 버튼 클릭 시
  const eraseBtn = document.getElementById("tb-erase-btn");
  if (eraseBtn) {
    eraseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      eraseAnnotationInSelection();
    });
  }
}

// 텍스트 선택 감지 및 툴바 위치 계산 (모바일 뷰포트 경계 이탈 방지)
function handleSelectionChange() {
  const toolbar = document.getElementById("annotation-floating-toolbar");
  if (!toolbar) return;

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) {
    return;
  }

  const selectedText = selection.toString().trim();
  if (!selectedText || selectedText.length < 2) {
    toolbar.style.display = "none";
    return;
  }

  // 선택된 영역이 본문 콘텐츠 내부인지 검증
  const range = selection.getRangeAt(0);
  const commonAncestor = range.commonAncestorContainer;
  const chapterCard = commonAncestor.nodeType === 1 
    ? commonAncestor.closest(".wiki-chapter-card")
    : commonAncestor.parentElement.closest(".wiki-chapter-card");

  if (!chapterCard) {
    toolbar.style.display = "none";
    return;
  }

  WikiState.currentSelectionRange = range;

  // 툴바 좌표 계산
  const rect = range.getBoundingClientRect();
  const toolbarWidth = Math.min(340, window.innerWidth - 24);
  let top = window.scrollY + rect.top - 56;
  let left = window.scrollX + rect.left + (rect.width / 2) - (toolbarWidth / 2);

  // 모바일 화면 좌우 밖으로 삐져나가지 않도록 경계 바운딩
  const minLeft = window.scrollX + 10;
  const maxLeft = window.scrollX + window.innerWidth - toolbarWidth - 10;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  if (top < window.scrollY + 70) {
    top = window.scrollY + rect.bottom + 12;
  }

  toolbar.style.top = `${top}px`;
  toolbar.style.left = `${left}px`;
  toolbar.style.display = "flex";
}

// 주석(형광펜 / 밑줄) 생성 및 영구 저장
function applyAnnotation({ type, style, openModal = false }) {
  const toolbar = document.getElementById("annotation-floating-toolbar");
  if (toolbar) toolbar.style.display = "none";

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return null;

  const range = WikiState.currentSelectionRange || selection.getRangeAt(0);
  const selectedText = selection.toString().trim();
  if (!selectedText) return null;

  const commonAncestor = range.commonAncestorContainer;
  const chapterCard = commonAncestor.nodeType === 1 
    ? commonAncestor.closest(".wiki-chapter-card")
    : commonAncestor.parentElement.closest(".wiki-chapter-card");

  if (!chapterCard) return null;
  const chapterId = chapterCard.id;

  const annId = "ann_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);

  const newAnnotation = {
    id: annId,
    chapterId: chapterId,
    type: type,
    style: style,
    text: selectedText,
    memo: "",
    createdAt: new Date().toISOString()
  };

  wrapRangeWithAnnotation(range, newAnnotation);

  WikiState.annotations.push(newAnnotation);
  saveAnnotationsToStorage();

  renderSidebarNav();
  updateGlobalAnnotationCount();

  selection.removeAllRanges();
  WikiState.currentSelectionRange = null;

  return newAnnotation;
}

// DOM Range를 <span> 태그로 감싸는 알고리즘
function wrapRangeWithAnnotation(range, ann) {
  try {
    const span = document.createElement("span");
    span.id = ann.id;
    span.dataset.annId = ann.id;
    span.dataset.chapterId = ann.chapterId;
    span.dataset.type = ann.type;
    span.dataset.style = ann.style;

    if (ann.type === "highlight") {
      span.className = `wiki-highlight ${getHighlightClass(ann.style)}`;
    } else {
      span.className = `wiki-highlight wiki-underline-${ann.style}`;
    }

    if (ann.memo) {
      span.classList.add("has-memo");
    }

    span.addEventListener("click", (e) => {
      e.stopPropagation();
      openMemoModalById(ann.id);
    });

    range.surroundContents(span);
  } catch (err) {
    safeHighlightFallback(ann);
  }
}

// 텍스트 기반 안전 매칭 폴백 및 자동 복원 함수
function safeHighlightFallback(ann) {
  const chapterCard = document.getElementById(ann.chapterId);
  if (!chapterCard) return;

  const walker = document.createTreeWalker(
    chapterCard,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let textNode;
  while ((textNode = walker.nextNode())) {
    const text = textNode.nodeValue;
    const index = text.indexOf(ann.text);
    if (index !== -1 && !textNode.parentElement.closest(".wiki-highlight")) {
      const targetRange = document.createRange();
      targetRange.setStart(textNode, index);
      targetRange.setEnd(textNode, index + ann.text.length);

      const span = document.createElement("span");
      span.id = ann.id;
      span.dataset.annId = ann.id;
      span.dataset.chapterId = ann.chapterId;
      span.dataset.type = ann.type;
      span.dataset.style = ann.style;

      if (ann.type === "highlight") {
        span.className = `wiki-highlight ${getHighlightClass(ann.style)}`;
      } else {
        span.className = `wiki-highlight wiki-underline-${ann.style}`;
      }

      if (ann.memo) {
        span.classList.add("has-memo");
      }

      span.addEventListener("click", (e) => {
        e.stopPropagation();
        openMemoModalById(ann.id);
      });

      try {
        targetRange.surroundContents(span);
        break;
      } catch (e) {
        // 복합 DOM 안전 무시
      }
    }
  }
}

function getHighlightClass(color) {
  switch (color) {
    case "#FEF08A": return "hl-color-yellow";
    case "#BBF7D0": return "hl-color-green";
    case "#BFDBFE": return "hl-color-blue";
    case "#FBCFE8": return "hl-color-pink";
    case "#E9D5FF": return "hl-color-purple";
    default: return "hl-color-yellow";
  }
}

function eraseAnnotationInSelection() {
  const toolbar = document.getElementById("annotation-floating-toolbar");
  if (toolbar) toolbar.style.display = "none";

  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const range = WikiState.currentSelectionRange || selection.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const parentSpan = container.nodeType === 1 ? container.closest(".wiki-highlight") : container.parentElement.closest(".wiki-highlight");

  if (parentSpan) {
    const annId = parentSpan.dataset.annId;
    deleteAnnotationById(annId);
  }
  selection.removeAllRanges();
}

function restoreAllAnnotations() {
  WikiState.annotations.forEach(ann => {
    safeHighlightFallback(ann);
  });
}

// =============================================================================
// 7. 주석 & 메모 관리 모달 (MemoEditModal) 동작
// =============================================================================
function openMemoModalById(annId) {
  const ann = WikiState.annotations.find(a => a.id === annId);
  if (!ann) return;

  WikiState.activeAnnotationId = annId;

  const modal = document.getElementById("memo-edit-modal");
  const quoteEl = document.getElementById("memo-quote-text");
  const textarea = document.getElementById("memo-textarea");
  const confirmBox = document.getElementById("memo-delete-confirm-box");

  if (quoteEl) quoteEl.textContent = `"${ann.text}"`;
  if (textarea) textarea.value = ann.memo || "";
  if (confirmBox) confirmBox.style.display = "none";

  document.querySelectorAll(".style-opt-btn").forEach(btn => {
    const isCurrent = (ann.type === "highlight" && btn.dataset.color === ann.style) ||
                      (ann.type === "underline" && btn.dataset.underline === ann.style);
    btn.classList.toggle("active", isCurrent);
  });

  modal.style.display = "flex";
  if (textarea) textarea.focus();

  bindMemoModalStylePickers(ann);
}

function bindMemoModalStylePickers(ann) {
  document.querySelectorAll(".style-opt-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".style-opt-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (btn.dataset.color) {
        ann.type = "highlight";
        ann.style = btn.dataset.color;
      } else if (btn.dataset.underline) {
        ann.type = "underline";
        ann.style = btn.dataset.underline;
      }
    };
  });

  const saveBtn = document.getElementById("save-memo-btn");
  if (saveBtn) {
    saveBtn.onclick = () => {
      const textarea = document.getElementById("memo-textarea");
      ann.memo = textarea ? textarea.value.trim() : "";

      const span = document.getElementById(ann.id);
      if (span) {
        span.className = ann.type === "highlight" 
          ? `wiki-highlight ${getHighlightClass(ann.style)}` 
          : `wiki-highlight wiki-underline-${ann.style}`;
        span.classList.toggle("has-memo", !!ann.memo);
      }

      saveAnnotationsToStorage();
      renderSidebarNav();
      closeMemoModal();
    };
  }

  const triggerDelBtn = document.getElementById("trigger-delete-btn");
  const confirmDelBtn = document.getElementById("confirm-delete-btn");
  const cancelDelBtn = document.getElementById("cancel-delete-btn");
  const confirmBox = document.getElementById("memo-delete-confirm-box");

  if (triggerDelBtn && confirmBox) {
    triggerDelBtn.onclick = () => {
      confirmBox.style.display = "block";
    };
  }
  if (cancelDelBtn && confirmBox) {
    cancelDelBtn.onclick = () => {
      confirmBox.style.display = "none";
    };
  }
  if (confirmDelBtn) {
    confirmDelBtn.onclick = () => {
      deleteAnnotationById(ann.id);
      closeMemoModal();
    };
  }
}

function closeMemoModal() {
  const modal = document.getElementById("memo-edit-modal");
  if (modal) modal.style.display = "none";
  WikiState.activeAnnotationId = null;
}

function deleteAnnotationById(annId) {
  const annIndex = WikiState.annotations.findIndex(a => a.id === annId);
  if (annIndex === -1) return;

  const ann = WikiState.annotations[annIndex];
  WikiState.annotations.splice(annIndex, 1);
  saveAnnotationsToStorage();

  const span = document.getElementById(annId);
  if (span && span.parentNode) {
    const parent = span.parentNode;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  }

  renderSidebarNav();
  updateGlobalAnnotationCount();
}

function saveAnnotationsToStorage() {
  localStorage.setItem("wiki_annotations", JSON.stringify(WikiState.annotations));
}

function updateGlobalAnnotationCount() {
  const badge = document.getElementById("header-annotation-badge");
  if (badge) {
    badge.textContent = WikiState.annotations.length;
  }
}

// =============================================================================
// 8. 개인화 학습 보관함 모달 (StudyNotebookModal)
// =============================================================================
function openNotebookModal() {
  const modal = document.getElementById("study-notebook-modal");
  if (!modal) return;

  modal.style.display = "flex";
  renderNotebookList("all", "");

  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      const searchVal = document.getElementById("notebook-search-input").value.trim();
      renderNotebookList(filter, searchVal);
    };
  });

  const searchInput = document.getElementById("notebook-search-input");
  if (searchInput) {
    searchInput.oninput = (e) => {
      const activeChip = document.querySelector(".filter-chip.active");
      const filter = activeChip ? activeChip.dataset.filter : "all";
      renderNotebookList(filter, e.target.value.trim());
    };
  }
}

function closeNotebookModal() {
  const modal = document.getElementById("study-notebook-modal");
  if (modal) modal.style.display = "none";
}

function renderNotebookList(filter, keyword) {
  const listContainer = document.getElementById("notebook-item-list");
  if (!listContainer) return;

  const total = WikiState.annotations.length;
  const hlCount = WikiState.annotations.filter(a => a.type === "highlight").length;
  const ulCount = WikiState.annotations.filter(a => a.type === "underline").length;
  const memoCount = WikiState.annotations.filter(a => !!a.memo).length;

  document.getElementById("nb-count-all").textContent = total;
  document.getElementById("nb-count-hl").textContent = hlCount;
  document.getElementById("nb-count-ul").textContent = ulCount;
  document.getElementById("nb-count-memo").textContent = memoCount;

  let items = WikiState.annotations;
  if (filter === "highlight") items = items.filter(a => a.type === "highlight");
  if (filter === "underline") items = items.filter(a => a.type === "underline");
  if (filter === "memo") items = items.filter(a => !!a.memo);

  if (keyword) {
    const kw = keyword.toLowerCase();
    items = items.filter(a => a.text.toLowerCase().includes(kw) || (a.memo && a.memo.toLowerCase().includes(kw)));
  }

  if (items.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        저장된 주석 내역이 없습니다.
      </div>
    `;
    return;
  }

  listContainer.innerHTML = items.map(ann => {
    const chapter = wikiChapters.find(c => c.id === ann.chapterId);
    const chapTitle = chapter ? chapter.shortTitle : "가이드 본문";
    const dateStr = new Date(ann.createdAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

    let previewStyle = "";
    if (ann.type === "highlight") {
      previewStyle = `background-color: ${ann.style}; color: #000;`;
    } else {
      previewStyle = `text-decoration: underline 2.5px solid ${ann.style === 'solid-red' ? '#dc2626' : (ann.style === 'solid-blue' ? '#2563eb' : '#d97706')};`;
    }

    return `
      <div class="nb-card">
        <div class="nb-card-header">
          <span class="nb-sec-name">📖 ${chapTitle}</span>
          <span class="nb-date">${dateStr}</span>
        </div>
        <div class="nb-quote" style="${previewStyle}">
          "${escapeHtml(ann.text)}"
        </div>
        ${ann.memo ? `<div class="nb-memo-text"><strong>📝 메모:</strong> ${escapeHtml(ann.memo)}</div>` : ''}
        <div style="display:flex; justify-content:flex-end; gap:6px; margin-top:4px;">
          <button type="button" class="btn btn-secondary-sm" onclick="closeNotebookModal(); openMemoModalById('${ann.id}');">수정</button>
          <button type="button" class="btn btn-danger-sm" onclick="deleteAnnotationById('${ann.id}'); renderNotebookList('${filter}', '${keyword}');">삭제</button>
        </div>
      </div>
    `;
  }).join("");
}

function exportAnnotationsJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(WikiState.annotations, null, 2));
  const dlAnchor = document.createElement("a");
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", `iberia_study_notebook_${new Date().toISOString().slice(0, 10)}.json`);
  dlAnchor.click();
}

function importAnnotationsJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        WikiState.annotations = imported;
        saveAnnotationsToStorage();
        renderChapters();
        restoreAllAnnotations();
        updateGlobalAnnotationCount();
        alert(`총 ${imported.length}건의 학습 주석 데이터를 성공적으로 복원했습니다!`);
        openNotebookModal();
      }
    } catch (err) {
      alert("올바르지 않은 JSON 파일 형식입니다.");
    }
  };
  reader.readAsText(file);
}

// =============================================================================
// 9. 실무 보조 도구 (환율 계산기, 35종 상세 체크리스트, 회화 TTS, 긴급망)
// =============================================================================
function initQuickTools() {
  document.querySelectorAll(".tool-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tool-tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tool-tab-panel").forEach(p => p.style.display = "none");

      btn.classList.add("active");
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) targetPanel.style.display = "block";
    });
  });

  const eurInput = document.getElementById("calc-eur-input");
  const rateInput = document.getElementById("calc-rate-input");
  const memberInput = document.getElementById("calc-member-count");
  const tipInput = document.getElementById("calc-tip-rate");

  const calcElements = [eurInput, rateInput, memberInput, tipInput];
  calcElements.forEach(el => {
    if (el) el.addEventListener("input", recalculateFinance);
  });
  recalculateFinance();

  initChecklistModule();
  renderSurvivalPhrases();
  renderEmergencyContacts();
}

function openToolsModal() {
  const modal = document.getElementById("quick-tools-modal");
  if (modal) modal.style.display = "flex";
}
function closeToolsModal() {
  const modal = document.getElementById("quick-tools-modal");
  if (modal) modal.style.display = "none";
}

function recalculateFinance() {
  const eur = parseFloat(document.getElementById("calc-eur-input")?.value) || 0;
  const rate = parseFloat(document.getElementById("calc-rate-input")?.value) || 1480;
  const members = parseInt(document.getElementById("calc-member-count")?.value, 10) || 6;
  const tip = parseFloat(document.getElementById("calc-tip-rate")?.value) || 0;

  const totalEurWithTip = eur * (1 + tip / 100);
  const totalKrw = totalEurWithTip * rate;

  const perPersonEur = members > 0 ? totalEurWithTip / members : 0;
  const perPersonKrw = members > 0 ? totalKrw / members : 0;

  const krwTotalEl = document.getElementById("calc-krw-total");
  const perEurEl = document.getElementById("calc-per-eur");
  const perKrwEl = document.getElementById("calc-per-krw");

  if (krwTotalEl) krwTotalEl.textContent = `${Math.round(totalKrw).toLocaleString()} 원`;
  if (perEurEl) perEurEl.textContent = `${perPersonEur.toFixed(2)} €`;
  if (perKrwEl) perKrwEl.textContent = `${Math.round(perPersonKrw).toLocaleString()} 원`;
}

function initChecklistModule() {
  document.querySelectorAll(".chk-filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chk-filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      WikiState.currentChecklistFilter = chip.dataset.category;
      renderChecklist();
    });
  });

  const addBtn = document.getElementById("add-custom-item-btn");
  const inputEl = document.getElementById("custom-item-input");
  const catEl = document.getElementById("custom-item-cat");

  if (addBtn && inputEl) {
    const handleAdd = () => {
      const text = inputEl.value.trim();
      if (!text) {
        alert("추가할 준비물 이름을 입력해 주세요.");
        return;
      }
      const category = catEl ? catEl.value : "개인소지품";
      const newItem = {
        id: "chk-custom-" + Date.now(),
        category: category,
        text: text,
        tip: "개인 맞춤 추가 준비물입니다.",
        isCustom: true
      };

      WikiState.customChecklist.push(newItem);
      localStorage.setItem("wiki_custom_checklist", JSON.stringify(WikiState.customChecklist));
      inputEl.value = "";
      renderChecklist();
    };

    addBtn.addEventListener("click", handleAdd);
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleAdd();
    });
  }

  renderChecklist();
}

function renderChecklist() {
  const container = document.getElementById("checklist-items-container");
  if (!container) return;

  const allItems = [...quickToolsData.checklist, ...WikiState.customChecklist];

  const filter = WikiState.currentChecklistFilter;
  const filteredItems = filter === "all" 
    ? allItems 
    : allItems.filter(item => item.category === filter);

  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--text-muted); font-size:0.86rem;">
        해당 카테고리에 등록된 준비물이 없습니다.
      </div>
    `;
    updateChecklistProgress(allItems);
    return;
  }

  container.innerHTML = filteredItems.map(item => {
    const isChecked = WikiState.checkedItems.includes(item.id);
    const customDelBtn = item.isCustom 
      ? `<button type="button" class="del-custom-item-btn" onclick="deleteCustomChecklistItem('${item.id}')" title="삭제">✕</button>` 
      : "";

    return `
      <div class="checklist-item-row ${isChecked ? 'completed' : ''}" id="chk-row-${item.id}">
        <input type="checkbox" id="${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleChecklistItem('${item.id}')">
        <label for="${item.id}" class="checklist-item-body">
          <div class="checklist-item-main">
            <span class="chapter-cat-badge">${item.category}</span>
            <span class="checklist-item-text">${escapeHtml(item.text)}</span>
            ${customDelBtn}
          </div>
          ${item.tip ? `<div class="checklist-item-tip">💡 ${escapeHtml(item.tip)}</div>` : ''}
        </label>
      </div>
    `;
  }).join("");

  updateChecklistProgress(allItems);
}

function toggleChecklistItem(id) {
  const idx = WikiState.checkedItems.indexOf(id);
  if (idx > -1) {
    WikiState.checkedItems.splice(idx, 1);
  } else {
    WikiState.checkedItems.push(id);
  }
  localStorage.setItem("wiki_checked_items", JSON.stringify(WikiState.checkedItems));

  const row = document.getElementById(`chk-row-${id}`);
  if (row) {
    row.classList.toggle("completed", idx === -1);
  }

  const allItems = [...quickToolsData.checklist, ...WikiState.customChecklist];
  updateChecklistProgress(allItems);
}

function deleteCustomChecklistItem(id) {
  WikiState.customChecklist = WikiState.customChecklist.filter(item => item.id !== id);
  WikiState.checkedItems = WikiState.checkedItems.filter(chkId => chkId !== id);
  localStorage.setItem("wiki_custom_checklist", JSON.stringify(WikiState.customChecklist));
  localStorage.setItem("wiki_checked_items", JSON.stringify(WikiState.checkedItems));
  renderChecklist();
}

function updateChecklistProgress(allItems) {
  const items = allItems || [...quickToolsData.checklist, ...WikiState.customChecklist];
  const total = items.length;
  const completed = items.filter(it => WikiState.checkedItems.includes(it.id)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const textEl = document.getElementById("checklist-progress-text");
  const barEl = document.getElementById("checklist-progress-bar");

  if (textEl) textEl.textContent = `완료 ${completed} / ${total} (${percent}%)`;
  if (barEl) barEl.style.width = `${percent}%`;
}

function renderSurvivalPhrases() {
  const container = document.getElementById("phrase-cards-container");
  if (!container) return;

  container.innerHTML = quickToolsData.phrases.map(p => `
    <div class="phrase-card">
      <div class="phrase-main">
        <span class="chapter-cat-badge" style="font-size:0.7rem;">${p.situation} &bull; ${p.langLabel}</span>
        <strong>${p.phrase}</strong>
        <span class="phrase-pron">🗣️ [${p.pronunciation}]</span>
        <div class="phrase-meaning">💡 ${p.meaning}</div>
      </div>
      <button type="button" class="speak-btn" onclick="speakPhrase('${p.phrase}', '${p.lang}')" title="원어민 발음 듣기">
        🔊
      </button>
    </div>
  `).join("");
}

function speakPhrase(text, lang) {
  if (!("speechSynthesis" in window)) {
    alert("현재 브라우저는 음성 합성(TTS) 기능을 지원하지 않습니다.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "es" ? "es-ES" : "pt-PT";
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

function renderEmergencyContacts() {
  const container = document.getElementById("contact-cards-container");
  if (!container) return;

  container.innerHTML = quickToolsData.contacts.map(c => `
    <div class="contact-card">
      <h5>${c.name}</h5>
      <a href="tel:${c.tel.replace(/[^0-9+]/g, '')}" class="contact-tel">📞 ${c.tel}</a>
      <p style="font-size:0.8rem; color:var(--text-muted);">${c.desc}</p>
    </div>
  `).join("");
}

// =============================================================================
// 10. 비상용 마스터 페이퍼 입력 & A4 인쇄 프리뷰
// =============================================================================
function initMasterPaper() {
  const fields = [
    "paper-m1-name", "paper-m1-pass", "paper-m2-name", "paper-m2-pass",
    "paper-m3-name", "paper-m3-pass", "paper-m4-name", "paper-m4-pass",
    "paper-m5-name", "paper-m5-pass", "paper-m6-name", "paper-m6-pass",
    "paper-insurance", "paper-medical-tel",
    "paper-hotel-madrid", "paper-hotel-bcn", "paper-hotel-lisbon", "paper-hotel-porto"
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (WikiState.masterPaperData[id]) {
      el.value = WikiState.masterPaperData[id];
    }
    el.addEventListener("input", () => {
      WikiState.masterPaperData[id] = el.value;
      localStorage.setItem("wiki_master_paper", JSON.stringify(WikiState.masterPaperData));
    });
  });
}

function openMasterPaperModal() {
  const modal = document.getElementById("master-paper-modal");
  if (modal) modal.style.display = "flex";
}
function closeMasterPaperModal() {
  const modal = document.getElementById("master-paper-modal");
  if (modal) modal.style.display = "none";
}

// =============================================================================
// 11. 스크롤 진행률 & 스마트 플로팅 탑(Top) 버튼 (SVG 프로그레스 링)
// =============================================================================
function initScrollAndTopButton() {
  const topBtn = document.getElementById("floating-top-btn");
  const circle = document.getElementById("top-progress-circle");
  const tooltip = document.getElementById("top-progress-tooltip");
  const progressBar = document.getElementById("reading-progress-bar");

  const circumference = 125.66;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (topBtn) {
      if (scrollY > 250) {
        topBtn.classList.add("visible");
      } else {
        topBtn.classList.remove("visible");
      }
    }

    if (circle) {
      const offset = circumference - (scrollPercent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }

    if (tooltip) {
      tooltip.textContent = `${Math.round(scrollPercent)}%`;
    }

    syncActiveSidebarChapter();
  }, { passive: true });

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function syncActiveSidebarChapter() {
  const cards = document.querySelectorAll(".wiki-chapter-card");
  let currentId = null;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = card.id;
    }
  });

  if (currentId) {
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.target === currentId);
    });
  }
}

// =============================================================================
// 12. 키보드 단축키 지원 (←, → 챕터 이동, ESC 모달 닫기)
// =============================================================================
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      if (e.key === "Escape") {
        closeAllModals();
      }
      return;
    }

    if (e.key === "Escape") {
      closeAllModals();
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "[") {
      navigateChapter(-1);
    }

    if (e.key === "ArrowRight" || e.key === "]") {
      navigateChapter(1);
    }
  });
}

function navigateChapter(direction) {
  const currentActive = document.querySelector(".nav-item.active");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  if (navItems.length === 0) return;

  let currentIndex = navItems.indexOf(currentActive);
  if (currentIndex === -1) currentIndex = 0;

  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) nextIndex = 0;
  if (nextIndex >= navItems.length) nextIndex = navItems.length - 1;

  const targetItem = navItems[nextIndex];
  if (targetItem) {
    const targetId = targetItem.dataset.target;
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      navItems.forEach(n => n.classList.remove("active"));
      targetItem.classList.add("active");
    }
  }
}

function closeAllModals() {
  closeMemoModal();
  closeNotebookModal();
  closeToolsModal();
  closeMasterPaperModal();
  closeMobileSidebar();
  const toolbar = document.getElementById("annotation-floating-toolbar");
  if (toolbar) toolbar.style.display = "none";
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
