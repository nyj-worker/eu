/**
 * ==============================================================================
 * [data.js] 이베리아 트래블 마스터 가이드 데이터셋
 * ==============================================================================
 * 원문(spain_portugal_travel_master_guide.md)의 내용을 100% 빠짐없이 수록하고,
 * 4050 성인 6인 팀에 맞춘 직관적인 핵심 요약 데이터를 함께 제공하는 통합 데이터 모듈입니다.
 * 
 * 구조:
 * - wikiChapters: 각 섹션별 데이터 (원문 HTML 100% + 실무 요약 카드 데이터)
 * - quickToolsData: 환율, 상세 여행 필수품 체크리스트, 서바이벌 회화, 비상 연락망 데이터
 * ==============================================================================
 */

const wikiChapters = [
  {
    id: "sec-1",
    number: "01",
    title: "💳 1. 필수 트래블 카드 운영 및 발급",
    shortTitle: "트래블 카드 운영 및 발급",
    category: "금융/결제",
    badge: "출국 전 즉시 발급 필수",
    summary: {
      coreMessage: "스페인은 완벽한 '현금 없는 사회'입니다. 결제 실패 리스크 방지를 위해 트래블월렛(Visa)과 하나 트래블로그(Mastercard) 2종을 교차 발급받아 메인/서브로 운영하세요.",
      keyPoints: [
        { label: "메인 카드", desc: "트래블월렛 (Visa) - 유로 환불 시 수수료 거의 없음, 깔끔한 공금 정산에 최적" },
        { label: "서브 카드", desc: "하나 트래블로그 (Mastercard) - 자동 충전 지원, 단 남은 유로 원화 환불 시 1% 수수료 차감" },
        { label: "배송 소요", desc: "영업일 기준 4일~7일 소요되므로 오늘 즉시 신청 필수" }
      ],
      actionItems: [
        "트래블월렛 앱 설치 ➔ 국내 계좌 연동 ➔ 실물 카드 배송 신청 (Visa)",
        "하나머니 앱 설치 ➔ 체크카드(Mastercard 브랜드) 선택 ➔ 배송지 입력"
      ],
      proTip: "대인원 6인의 결제 오류를 대비해 메인 총무는 2개 카드 모두 실물로 소지하고 있어야 안전합니다."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          스페인과 포르투갈은 완벽한 <strong>'현금 없는 사회'</strong>이므로 선불식 외화 카드가 필수입니다. 
          6인 대인원의 결제 실패 리스크를 줄이기 위해 <strong>두 종류의 카드를 교차 발급받아 총무의 메인/서브 카드로 운영</strong>하는 것을 강력히 권장합니다.
        </p>

        <div class="callout callout-warning">
          <div class="callout-icon">⚠️</div>
          <div class="callout-content">
            <strong>발급 기한 엄수:</strong> 두 카드 모두 배송에 주말 제외 <strong>영업일 기준 4일~7일</strong>이 소요되므로 오늘 바로 신청하셔야 출국 전 수령이 가능합니다.
          </div>
        </div>

        <h3>🔄 충전 및 환불 메커니즘 차이점</h3>
        <div class="card-comparison-grid">
          <div class="spec-card">
            <div class="spec-card-header bg-blue">
              <span class="card-badge">메인 권장</span>
              <h4>트래블월렛 (Visa 브랜드)</h4>
            </div>
            <div class="spec-card-body">
              <ul>
                <li><strong>특징:</strong> 필요한 금액을 유로(EUR) 지갑에 수동으로 선충전하여 사용. 잔액 부족 시 앱에서 즉시 충전 가능(5초 소요).</li>
                <li><strong>장점:</strong> 여행 후 남은 유로를 다시 원화로 환불할 때 별도의 환급 수수료(차감)가 거의 없음. 깔끔한 공금 정산에 유리.</li>
              </ul>
            </div>
          </div>

          <div class="spec-card">
            <div class="spec-card-header bg-emerald">
              <span class="card-badge">서브 권장</span>
              <h4>하나 트래블로그 (Mastercard 브랜드)</h4>
            </div>
            <div class="spec-card-body">
              <ul>
                <li><strong>특징:</strong> '실시간 자동환전(자동 충전)' 기능 지원. 유로 잔액이 부족해도 연결된 한국 계좌에서 자동으로 환전되어 결제됨.</li>
                <li><strong>주의:</strong> 여행 후 남은 유로를 한국 원화로 돌려받을 때 <strong>환불 금액의 1%가 수수료로 차감</strong>됨. 따라서 한 번에 너무 많은 금액을 환전해 두지 않는 것이 이득.</li>
              </ul>
            </div>
          </div>
        </div>

        <h3>📱 스마트폰 기준 상세 발급 절차 (지금 즉시 신청 필수!)</h3>
        
        <div class="step-guide-box">
          <div class="step-header">
            <span class="step-number">STEP 1</span>
            <h4>트래블월렛 발급 절차</h4>
          </div>
          <ol class="step-list">
            <li>스마트폰 앱스토어에서 <strong>'트래블월렛'</strong> 다운로드 및 회원가입.</li>
            <li>오픈뱅킹을 통해 평소 쓰는 <strong>국내 은행 계좌 연동</strong>.</li>
            <li>주민등록증 또는 운전면허증 촬영 후 본인 인증 완료 (모바일 카드 즉시 발급).</li>
            <li>앱 내 메뉴에서 <strong>[실물 카드 신청하기]</strong> 버튼 클릭 후 배송지 입력.</li>
          </ol>
        </div>

        <div class="step-guide-box">
          <div class="step-header">
            <span class="step-number">STEP 2</span>
            <h4>하나 트래블로그 발급 절차</h4>
          </div>
          <ol class="step-list">
            <li>앱스토어에서 <strong>'하나머니'</strong> 앱 다운로드 및 회원가입.</li>
            <li>충전 계좌 연결 (하나은행 계좌가 없어도 주거래 타행 계좌 그대로 연결 가능).</li>
            <li>앱 메인 화면에서 <strong>[트래블로그 카드 신청]</strong> 선택 ➔ <strong>'체크카드'</strong> 선택 (연회비 없음).</li>
            <li>해외 가맹점 범용성이 좋은 <strong>Mastercard 브랜드</strong> 및 여권 디자인 등 플레이트 선택 후 배송지 입력.</li>
          </ol>
        </div>
      </div>
    `
  },
  {
    id: "sec-2",
    number: "02",
    title: "🚆 2. 도시 간 이동 수단 예약 및 결제 오류 완벽 타파",
    shortTitle: "도시 간 이동 수단 예약 & 결제",
    category: "교통수단",
    badge: "결제 튕김 해결법",
    summary: {
      keyPoints: [
        { label: "스페인 렌페(Renfe)", desc: "한국 카드 직접 입력 시 80% 튕김. PayPal(페이팔)에 카드 등록 후 결제하거나 전용 모바일 앱 이용" },
        { label: "민간 기차 대안", desc: "마드리드-바르셀로나 등 구간은 위고(Ouigo)나 이리요(Iryo) 앱 이용 시 훨씬 저렴하고 전산 안정" },
        { label: "포르투갈 CP", desc: "Visa(트래블월렛) 결제 시 돈만 빠지고 튕기는 오류 다발. 반드시 Mastercard(트래블로그)나 PayPal 사용" },
        { label: "고속버스(Alsa/FlixBus)", desc: "알사는 6인 일괄 결제로 수수료 절약, 플릭스는 수하물 태그 필수 보관" }
      ],
      actionItems: [
        "결제 전 PayPal 계정에 트래블카드 등록해두기",
        "포르투갈 CP는 30~60일 전 'Promo' 할인 티켓(1등석이 2등석보다 저렴) 선점",
        "철도청 오류 스트레스 시 수수료 1~3유로 내고 오미오(Omio) 앱 활용"
      ],
      proTip: "대행 앱 오미오(Omio) 또는 트레인라인(Trainline)을 쓰면 수수료가 조금 붙더라도 한국 카드로 100% 한 번에 통과됩니다."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          유럽 교통망은 한국 신용카드나 IP를 차단하는 보안 에러가 잦습니다. 아래 공식에 맞춰 예약을 진행하세요.
        </p>

        <div class="transport-block">
          <h3>🇪🇸 스페인 국철 '렌페(Renfe)' 및 민간 기차</h3>
          <ul>
            <li><strong>해결책:</strong> 카드 직접 입력 시 튕길 확률 80% 이상. 결제 수단에서 <strong>[PayPal (페이팔)]</strong>을 선택한 뒤, 페이팔 계정에 본인의 트래블카드를 등록해 결제하면 한 번에 통과됩니다. PC 웹보다 스마트폰 <strong>'Renfe' 공식 앱</strong>이 에러가 적습니다.</li>
            <li><strong>대안 (민간 고속열차):</strong> 마드리드 ⇄ 바르셀로나, 마드리드 ⇄ 세비야 노선은 프랑스 저가 고속열차인 <strong>위고(Ouigo)</strong>나 프리미엄 열차 <strong>이리요(Iryo)</strong> 앱을 이용하세요. 전산이 매우 안정적이고 요금도 훨씬 저렴합니다.</li>
          </ul>
        </div>

        <div class="transport-block">
          <h3>🇵🇹 포르투갈 국철 'CP'</h3>
          <ul>
            <li><strong>해결책:</strong> CP는 Visa 브랜드(트래블월렛) 결제 시 돈만 빠져나가고 티켓은 튕기는 고질적 전산 오류가 있습니다. 반드시 <strong>Mastercard 브랜드인 '하나 트래블로그'로 결제</strong>하거나 <strong>페이팔(PayPal)</strong> 우회 결제를 이용하세요.</li>
            <li><strong>꿀팁:</strong> 탑승 30~60일 전 오픈되는 <strong>'Promo' 티켓</strong>을 예매하면 1등석(Conforto) 요금이 2등석 정가보다 싸게 구매할 수 있습니다. 배치도 확인 시 진행 방향(순방향) 좌석을 체크하세요.</li>
          </ul>
        </div>

        <div class="transport-block">
          <h3>🚌 고속버스 (Alsa / FlixBus)</h3>
          <ul>
            <li><strong>알사 버스 (Alsa):</strong> 세비야 ⇄ 그라나다 등 기차가 없는 구간에 유용합니다. 결제 시 <strong>[Digital Wallet]</strong> 또는 <strong>[PayPal]</strong>을 선택하세요. 여러 명을 한 번에 결제해야 인당 붙는 대행 수수료를 아낄 수 있습니다.</li>
            <li><strong>플릭스 버스 (FlixBus):</strong> 시스템이 안정적이라 트래블카드가 다이렉트로 잘 긁힙니다. 국경을 넘는 장거리 이용 시 기사가 주는 수하물 태그(스티커)를 꼭 받아 보관하세요.</li>
          </ul>
        </div>

        <div class="callout callout-info">
          <div class="callout-icon">💡</div>
          <div class="callout-content">
            <strong>최종 치트키:</strong> 철도청 공식 홈 오류 스트레스가 심하다면 예매 건당 1~3유로의 수수료를 내더라도 <strong>오미오(Omio)</strong> 또는 <strong>트레인라인(Trainline)</strong> 대행 앱을 쓰면 한국 카드로 100% 한 번에 결제됩니다.
          </div>
        </div>
      </div>
    `
  },
  {
    id: "sec-3",
    number: "03",
    title: "🔒 3. 현지 치안 및 소매치기 실전 방어법",
    shortTitle: "현지 치안 & 소매치기 방어법",
    category: "안전/치안",
    badge: "다이소 방어템 준비",
    summary: {
      keyPoints: [
        { label: "위험 특징", desc: "강력 범죄는 적으나 단순 절도는 지능화. 6인 단체 대화 중 주의 분산 시 집중 표적" },
        { label: "4대 수법", desc: "①설문조사 단체 서명, ②새똥/오물 묻히기, ③식당 테이블보/지도 덮기, ④대중교통 밀치기" },
        { label: "다이소 필수템", desc: "스마트폰 스프링 스트랩, 옷핀 & S자 카라비너, 캐리어용 와이어 자물쇠" },
        { label: "행동 요령", desc: "백팩은 가슴 앞 착용, 식당 가방끈 발로 밟기, 접근 시 단호하게 'NO!' 외치기" }
      ],
      actionItems: [
        "출국 전 다이소에서 스프링 스트랩, 옷핀, S자 카라비너, 와이어 자물쇠 6세트 구매",
        "지하철/트램 탑승 전 백팩 가슴 앞으로 돌려 매기",
        "낯선 사람이 다가와 종이나 오물을 보이면 즉시 뒤로 물러나며 'NO!' 외치기"
      ],
      proTip: "카페 노천 테이블에 스마트폰을 올려두는 것은 '가져가라'는 신호와 같습니다. 절대 테이블 위에 폰을 두지 마세요."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          스페인과 포르투갈은 강력 범죄율은 낮으나 단순 절도(소매치기)는 지능화되어 있습니다. 
          6인 팀은 대화 도중 주의가 흐트러지기 쉬워 표적이 되기 좋으니 아래 수칙을 몸에 익혀야 합니다.
        </p>

        <h3>⚠️ 소매치기 4대 대표 수법</h3>
        <div class="threat-grid">
          <div class="threat-card">
            <span class="threat-number">1</span>
            <h4>설문조사 단체 서명</h4>
            <p>10대 소녀들이 설문지나 기부 서명판을 들이밀며 양손을 묶고 시선을 끄는 사이 동행이 가방을 텁니다.</p>
          </div>
          <div class="threat-card">
            <span class="threat-number">2</span>
            <h4>오물 묻히기</h4>
            <p>옷이나 가방에 새똥, 아이스크림이 묻었다며 친절하게 닦아주는 척 주의를 분산시킨 뒤 주머니를 텁니다.</p>
          </div>
          <div class="threat-card">
            <span class="threat-number">3</span>
            <h4>식당 테이블보/지도 덮기</h4>
            <p>노천카페 테이블 위에 올려둔 스마트폰 위에 큰 종이 지도를 펼쳐 길을 묻는 척하며, 지도 아래 스마트폰을 같이 쥐고 훔쳐 갑니다.</p>
          </div>
          <div class="threat-card">
            <span class="threat-number">4</span>
            <h4>대중교통 밀치기</h4>
            <p>바르셀로나 지하철, 리스본 28번 트램 승하차 시 3~4명이 한꺼번에 몸을 밀치며 혼란을 준 뒤 지퍼를 열고 지갑을 가져갑니다.</p>
          </div>
        </div>

        <h3>🛡️ 실전 방어 대책 및 장비 (출국 전 다이소 필수 아이템)</h3>
        <ul class="defense-list">
          <li><strong>스마트폰 스프링 스트랩:</strong> 폰 케이스와 가방 안쪽 지퍼 또는 바지 고리를 스프링 줄로 연결합니다. 날치기가 불가합니다.</li>
          <li><strong>옷핀 & S자 카라비너:</strong> 백팩이나 크로스백의 지퍼 2개를 옷핀이나 잠금식 카라비너로 묶어 두면 등 뒤에서 지퍼를 열 수 없습니다.</li>
          <li><strong>와이어 자물쇠:</strong> 기차(렌페/CP) 공용 짐칸에 캐리어를 둘 때 기둥과 캐리어를 통째로 묶어 둡니다. 중간 역 도난을 방지합니다.</li>
          <li><strong>가방 위치:</strong> 사람이 많은 곳에서는 백팩을 무조건 가슴 앞으로 돌려 매고 손을 얹으세요. 식당에서 가방을 둘 때는 가방끈을 본인 발로 밟고 앉아야 안전합니다.</li>
          <li><strong>단호한 거절:</strong> 이유 없이 다가오면 대꾸하지 말고 고개를 돌리며 큰소리로 <strong>"NO!"</strong>라고 외치고 자리를 피하세요.</li>
        </ul>
      </div>
    `
  },
  {
    id: "sec-4",
    number: "04",
    title: "🏃 4. 4050 6인 팀 맞춤 체력 및 건강 관리",
    shortTitle: "4050 맞춤 체력 및 건강 관리",
    category: "건강/체력",
    badge: "체력 안배 전략",
    summary: {
      keyPoints: [
        { label: "대형 유지 & 가드", desc: "길 찾을 때 전원 폰 보기 금지. 1~2명만 지도 보고 남성 대원들은 후방/외곽에서 주변 경계 유지" },
        { label: "신발 선택", desc: "유럽 코블스톤(돌바닥) 충격 완화를 위해 전원 두툼한 쿠션 러닝화/트래킹화 착용" },
        { label: "포르투갈 이동 팁", desc: "리스본·포르투 급경사는 우버 XL(6인승 대형 밴)이나 차량 2대 탑승이 대중교통보다 체력 극적 절약" },
        { label: "가을철 복장", desc: "낮엔 덥고 아침·저녁 쌀쌀. 가디건, 바람막이, 경량 패딩 겹쳐 입기(레이어드)" },
        { label: "필수 상비약", desc: "올리브유 음식 대비 소화제/위장약, 수면 시 압박스타킹, 튜브형 고추장/김 비상식량" }
      ],
      actionItems: [
        "신발은 얇은 플랫슈즈/단화 배제하고 최상급 쿠션 러닝화 착용",
        "리스본·포르투 언덕 구간은 걷지 말고 우버 XL 호출",
        "소화제, 파스, 압박스타킹, 튜브형 고추장 챙기기"
      ],
      proTip: "소매치기는 눈이 마주치는 사람을 절대 건드리지 않습니다. 외곽에서 주위를 둘러보는 남성 대원의 시선만으로도 90% 예방됩니다."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <ul class="health-tips-list">
          <li>
            <div class="tip-icon">👥</div>
            <div class="tip-body">
              <strong>대형 유지와 가드 역할:</strong> 길을 찾을 때 6명이 다 같이 폰만 보면 안 됩니다. 1~2명만 구글 맵을 보고, 
              <strong>남성 대원들은 대형의 후방이나 바깥쪽에 서서 의식적으로 주변을 경계</strong>해 주세요. 
              시선이 마주치면 소매치기들이 범행을 포기합니다.
            </div>
          </li>
          <li>
            <div class="tip-icon">👟</div>
            <div class="tip-body">
              <strong>신발은 무조건 쿠션 러닝화:</strong> 유럽은 울퉁불퉁한 돌바닥(코블스톤)이 많아 얇은 단화를 신으면 하루 만에 관절 통증이 옵니다. 
              무조건 쿠션감이 훌륭한 러닝화나 트래킹화를 전원 착용하세요.
            </div>
          </li>
          <li>
            <div class="tip-icon">🚕</div>
            <div class="tip-body">
              <strong>포르투갈 언덕은 택시(우버/볼트) 필수:</strong> 리스본과 포르투는 경사가 등산 수준입니다. 
              6명이면 <strong>우버 XL(6인승 대형 밴)</strong>을 호출하거나 일반 차량 2대를 나누어 타는 것이 대중교통비와 비슷하며 체력을 극적으로 아끼는 비결입니다.
            </div>
          </li>
          <li>
            <div class="tip-icon">🧥</div>
            <div class="tip-body">
              <strong>가을철 일교차 레이어드 룩:</strong> 10월 말 유럽은 낮엔 뜨겁고 그늘이나 아침·저녁엔 쌀쌀합니다. 
              입고 벗기 편한 가디건, 가벼운 바람막이, 경량 패딩을 가방에 상시 소지하세요.
            </div>
          </li>
          <li>
            <div class="tip-icon">💊</div>
            <div class="tip-body">
              <strong>상비약 코너:</strong> 위장약과 소화제는 필수입니다. 현지 음식이 올리브유 베이스라 속이 더부룩할 수 있습니다. 
              취침 시 다리 피로를 풀어줄 압박스타킹과 튜브형 고추장, 김 등 간단한 한식 비상식량은 훌륭한 활력소가 됩니다.
            </div>
          </li>
        </ul>
      </div>
    `
  },
  {
    id: "sec-5",
    number: "05",
    title: "💶 5. 영리한 현지 결제 및 환율 세팅",
    shortTitle: "현지 결제 & ATM 인출 공식",
    category: "환율/결제",
    badge: "DCC 수수료 폭탄 차단",
    summary: {
      keyPoints: [
        { label: "DCC 차단", desc: "단말기에 ₩/€ 뜨면 반드시 'EUR' 선택! 국내 카드사 앱에서 [해외원화결제 차단서비스] 출국 전 필수 신청" },
        { label: "스페인어 한마디", desc: "\"엔 에우로스, 포르 파보르 (En euros, por favor - 유로화로 결제해 주세요)\"" },
        { label: "사설 ATM 회피", desc: "Euronet 마크 사설 ATM은 사기 수수료 청구. 스페인은 산탄데르/도이치방크, 포르투갈은 멀티방코(Multibanco)만 이용" },
        { label: "ATM 핵심 조작", desc: "환전 화면에서 반드시 [Without Conversion] 또는 [Decline Conversion] 클릭해야 수수료 0원" },
        { label: "기계 삼킴 주의", desc: "돈과 카드가 나오면 20~30초 내 즉시 수령 (안내문 읽지 말고 바로 낚아채기)" }
      ],
      actionItems: [
        "보유한 모든 신용카드 앱에서 '해외원화결제(DCC) 차단' 등록",
        "ATM 화면에서 'Conversion' 거부(Decline/Without) 버튼 선택 암기",
        "포르투갈에서는 초록/빨간색 마크의 Multibanco ATM만 찾기"
      ],
      proTip: "유럽 ATM은 25초 정도 지나면 도난 방지로 돈과 카드를 기계가 삼켜버립니다. 영수증 읽지 마시고 돈과 카드부터 먼저 챙기세요!"
    },
    contentHtml: `
      <div class="wiki-section-body">
        <h3>🚨 DCC(해외 원화 결제) 환전 폭탄 차단 공식</h3>
        <p>카드 결제나 ATM 인출 시 현지 통화(유로)가 아닌 원화(KRW)로 결제하게 하여 5~10%의 수수료를 떼어가는 수법입니다.</p>
        
        <ul class="dcc-rule-list">
          <li><strong>결제 단말기 조작:</strong> 단말기 화면에 태극기(₩)와 유럽연합기(€)가 뜨면 <strong>반드시 'EUR' 또는 유럽연합기 쪽 버튼을 직접 누르세요.</strong></li>
          <li><strong>출국 전 세팅:</strong> 신용카드를 혼용할 경우 해당 카드사 앱에서 <strong>[해외원화결제 차단서비스(DCC 차단)]</strong>를 반드시 미리 신청해 두세요.</li>
          <li><strong>스페인어 한마디:</strong> 직원이 영수증을 주며 체크하라고 할 때 EUR에 체크하시고, 필요시 <strong>"엔 에우로스, 포르 파보르(En euros, por favor - 유로화로 결제해 주세요)"</strong>라고 요구하세요.</li>
        </ul>

        <h3>🏧 현지 ATM 수수료 무료 인출 화면 이동 공식</h3>
        <p>사설 ATM(Euronet 마크)은 사기적인 수수료를 청구하므로 절대 피하고, <strong>현지 제도권 은행 ATM</strong>만 이용합니다.</p>
        
        <div class="bank-recommend-grid">
          <div class="bank-card">
            <h4>스페인 추천 은행</h4>
            <p><strong>Deutsche Bank(도이치방크)</strong>, <strong>Santander(산탄데르)</strong></p>
          </div>
          <div class="bank-card">
            <h4>포르투갈 추천 은행</h4>
            <p>초록/빨간색 마크의 <strong>Multibanco(멀티방코)</strong> ATM (모든 카드 수수료 무료)</p>
          </div>
        </div>

        <div class="atm-step-box">
          <h4>[실전 ATM 조작 순서]</h4>
          <ol>
            <li><strong>[Language]</strong> ➔ <code>English</code> 선택</li>
            <li><strong>[Transaction]</strong> ➔ <code>Withdrawal (인출)</code> 선택</li>
            <li><strong>[Account Type]</strong> ➔ <code>Checking Account (당좌/체크계좌)</code> 선택</li>
            <li><strong>[PIN]</strong> ➔ 비밀번호 4자리 입력 후 엔터 <em>(6자리 요구 시 비밀번호 뒤에 00 입력)</em></li>
            <li>
              <strong class="highlight-warn">[Conversion 화면 - ★가장 중요★]</strong> ➔ 
              <code>Without Conversion</code> 또는 <code>Decline Conversion</code> (환전 미포함/거부) 버튼을 눌러야 
              내 트래블카드 유로 잔액에서 수수료 0원으로 정확히 해당 유로만 차감됩니다.
            </li>
          </ol>
        </div>

        <div class="callout callout-danger">
          <div class="callout-icon">🚨</div>
          <div class="callout-content">
            <strong>기계 삼킴 주의:</strong> 유럽 ATM은 인출 완료 후 카드와 현금을 20~30초 내에 집어 들지 않으면 도난 방지를 위해 기계가 다시 삼켜버립니다. 
            <strong>안내문 읽지 말고 돈과 카드부터 빠르게 낚아채세요.</strong>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "sec-6",
    number: "06",
    title: "🍽️ 6. 마드리드·리스본·바르셀로나·포르투 필수 미식 및 추천 식당",
    shortTitle: "4대 도시 필수 미식 & 추천 식당",
    category: "미식/맛집",
    badge: "6인 단체 예약 필수",
    summary: {
      keyPoints: [
        { label: "단체석 수칙", desc: "유럽은 2~4인석 위주. 6인 워크인은 거절 확률 90% 이상이므로 구글맵 또는 TheFork로 사전 예약 필수 (임의 의자 붙이기 금지)" },
        { label: "마드리드", desc: "해물 빠에야(주문 시 '씬 살(소금 빼고)' 요청 필수!), 새우 감바스 / 추천: Arrocería Marina Ventura, La Barraca" },
        { label: "리스본", desc: "포르투갈식 해물밥(한국인 최고의 해장죽), 바칼라우(대구) 요리 / 추천: Laurentina, Clube do Bacalhau" },
        { label: "바르셀로나", desc: "꿀대구(달콤+알리올리 소스), 맛조개 구이 / 추천: 시우다드 콘달 (Ciudad Condal), 비니투스 (Vinitus)" },
        { label: "포르투", desc: "문어 구이(입에서 녹는 부드러움), 프란세지냐 / 추천: Taberna dos Mercadores, Adega São Nicolau" }
      ],
      actionItems: [
        "빠에야 주문 시 반드시 \"씬 살(Sin Sal)\" 외치기",
        "일반 생수 주문 시 \"아구아 신 가스(Agua sin gas) 큰 병(Grande)\" 요청",
        "포트 와인은 도수 20도 안팎으로 매우 높으니 주량 조절"
      ],
      proTip: "스페인 음식은 기본 간이 매우 짭니다. \"씬 살(소금 없이)\"로 주문해도 해산물 자체 염분으로 한국인 입맛에 딱 맞습니다."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          유럽은 2~4인 테이블 세팅이 기본이므로, <strong>6인 단체 팀은 워크인 방문 시 자리가 없어 거절당할 확률이 매우 높습니다.</strong> 
          반드시 출국 전이나 최소 하루 전에 구글 맵 '예약하기' 또는 'TheFork'를 통해 6인 자리를 선점하세요. 식당 내에서 의자를 임의로 붙이는 것은 무례한 행동입니다.
        </p>

        <div class="city-food-section">
          <h3>🇪🇸 마드리드 (Madrid)</h3>
          <div class="menu-tags">
            <span class="tag">해물 빠에야</span>
            <span class="tag">새우 감바스</span>
          </div>
          <ul>
            <li><strong>추천 메뉴:</strong> 
              <ul>
                <li><strong>해물 빠에야:</strong> 철판 해물 볶음밥 스타일 (주문 시 반드시 <strong>"씬 살(Sin Sal, 소금 빼고)"</strong> 요청!)</li>
                <li><strong>새우 감바스:</strong> 올리브유와 마늘, 매콤한 고추가 들어간 얼큰한 새우 요리.</li>
              </ul>
            </li>
            <li><strong>추천 식당 (6인 예약 필수):</strong>
              <ul>
                <li><strong>Arrocería Marina Ventura:</strong> 빠에야 및 쌀 요리 전문점. 내부가 고풍스럽고 넓어 6인이 다양한 빠에야를 셰어하기 최적.</li>
                <li><strong>La Barraca:</strong> 1935년 오픈한 유서 깊은 전통 빠에야 맛집. 격식 있는 서비스로 대접받는 느낌을 줌.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="city-food-section">
          <h3>🇵🇹 리스본 (Lisbon)</h3>
          <div class="menu-tags">
            <span class="tag">포르투갈식 해물밥</span>
            <span class="tag">바칼라우(대구) 요리</span>
          </div>
          <ul>
            <li><strong>추천 메뉴:</strong>
              <ul>
                <li><strong>포르투갈식 해물밥:</strong> 토마토 베이스의 얼큰하고 자작한 해물 국밥/죽 스타일. 피로가 싹 풀리는 최고의 해장 메뉴.</li>
                <li><strong>바칼라우 요리:</strong> 말린 대구 요리. 계란과 볶은 '바칼라우 브라스'나 그릴 구이를 추천. 담백하고 비린내 없음.</li>
              </ul>
            </li>
            <li><strong>추천 식당 (6인 예약 필수):</strong>
              <ul>
                <li><strong>Laurentina:</strong> 1976년부터 이어온 대구 요리 전문 명가. 내부가 쾌적하여 와인을 곁들이며 6인이 모임 하기 최고.</li>
                <li><strong>Clube do Bacalhau:</strong> 짜지 않고 담백한 웰빙 대구 요리를 선보이는 아늑한 분위기의 식당.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="city-food-section">
          <h3>🇪🇸 바르셀로나 (Barcelona)</h3>
          <div class="menu-tags">
            <span class="tag">꿀대구</span>
            <span class="tag">맛조개 구이</span>
          </div>
          <ul>
            <li><strong>추천 메뉴:</strong>
              <ul>
                <li><strong>꿀대구:</strong> 부드러운 대구 살 위에 달콤한 꿀과 마늘 마요네즈(알리올리) 소스를 얹어 오븐에 구운 카탈루냐 최고의 미식.</li>
                <li><strong>맛조개 구이:</strong> 철판에 올리브유, 마늘, 파슬리를 뿌려 구운 쫄깃하고 담백한 조개 요리. 화이트 와인 안주로 일품.</li>
              </ul>
            </li>
            <li><strong>추천 식당:</strong>
              <ul>
                <li><strong>시우다드 콘달 (Ciudad Condal):</strong> 카탈루냐 광장 인근 최고 인기 타파스 바. 6인이 여러 타파스를 조금씩 시켜 맛보기 최고. (대기가 기니 오픈런 권장)</li>
                <li><strong>비니투스 (Vinitus):</strong> 한국인에게 가장 유명한 꿀대구 맛집. 회전율이 빨라 해산물이 신선하며 주문이 편리함.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="city-food-section">
          <h3>🇵🇹 포르투 (Porto)</h3>
          <div class="menu-tags">
            <span class="tag">문어 구이</span>
            <span class="tag">프란세지냐</span>
            <span class="tag">포트 와인</span>
          </div>
          <ul>
            <li><strong>추천 메뉴:</strong>
              <ul>
                <li><strong>문어 구이:</strong> 오븐에 오래 조리하여 이빨이 없어도 씹힐 정도로 부드러운 극상의 식감. 올리브유와 알감자의 환상 조합.</li>
                <li><strong>프란세지냐:</strong> 소시지, 고기, 치즈를 넣고 맥주 소스를 부어 끓인 포르투식 내장파괴 샌드위치. 6인이 맛보기용으로 1~2개만 시켜서 셰어 권장.</li>
              </ul>
            </li>
            <li><strong>추천 식당:</strong>
              <ul>
                <li><strong>Taberna dos Mercadores:</strong> 도미 소금구이 불 쇼와 인생 문어 요리를 파는 골목 맛집. 매장이 협소해 6인은 무조건 사전 예약 필수.</li>
                <li><strong>Adega São Nicolau:</strong> 도루 강변 근처 유서 깊은 식당. 문어 구이 퀄리티가 훌륭하며, 포르투 와인을 즐기기에 가장 낭만적인 분위기.</li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="callout callout-warning">
          <div class="callout-icon">🍷</div>
          <div class="callout-content">
            <strong>음료 주문 팁:</strong> 포르투의 명물 <strong>'포트 와인'은 도수가 20도 안팎</strong>으로 매우 높고 달콤하므로 주량 조절에 주의하세요. 
            물 주문 시에는 탄산 없는 일반 생수인 <strong>"아구아 신 가스(Agua sin gas)"</strong> 큰 병(Grande)으로 주문하는 것이 경제적입니다.
          </div>
        </div>
      </div>
    `
  },
  {
    id: "sec-7",
    number: "07",
    title: "🏨 7. 4050 대인원 최적 치안 중심 숙소 구역 추천",
    shortTitle: "치안 중심 최적 숙소 구역 추천",
    category: "숙소/안전",
    badge: "엘리베이터 유무 확인",
    summary: {
      keyPoints: [
        { label: "숙소 유형", desc: "구도심 좁은 골목(소매치기/경사) 피하고, 방 3개/화장실 2개 이상의 레지던스 아파트먼트 추천 (우버XL 승하차 용이)" },
        { label: "마드리드", desc: "챔버리 (Chamberí) 또는 살라만카 (Salamanca) 구역 - 고급 부촌, 평지 도로, 야간 보행 안전" },
        { label: "바르셀로나", desc: "에이샴플라 우측 구역 (Eixample Derecho) - 가우디 대로변, 탁 트인 시야로 소매치기 차단, 완전 평지" },
        { label: "리스본", desc: "아베니다 대로 및 마르케스 드 폼발 (Avenida da Liberdade / Marquês de Pombal) - 리스본 극소수 평지 구역, 최상급 치안" },
        { label: "필수 확인", desc: "구형 건물의 경우 캐리어 운반용 '정상 크기 엘리베이터(Lift)' 작동 여부 후기 대조 필수" }
      ],
      actionItems: [
        "숙소 예약 시 후기 검색창에 '엘리베이터', 'elevator', 'lift' 검색해 실제 작동 여부 확인",
        "구도심 좁은 골목 대신 대로변 접한 신시가지/부촌 아파트 선택",
        "6인 짐을 고려해 화장실 2개 이상 확보된 숙소 예약"
      ],
      proTip: "유럽 고건물 엘리베이터는 성인 1~2명만 타도 꽉 차거나 고장 난 경우가 많습니다. 6명의 무거운 캐리어를 들고 계단을 오르는 비극을 미리 방지하세요."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          좁고 복잡한 구도심 골목(소매치기 위험, 극심한 경사, 돌바닥)을 피하고, 평지 위주이면서 큰 도로가 인접해 대형 밴(우버 XL)을 타고 내리기 좋은 안전한 부촌/신시가지 위주로 숙소를 잡으셔야 합니다. 
          호텔 방 3개보다 <strong>방 3개/화장실 2개 이상의 레지던스형 고급 아파트먼트</strong>가 6인 모임에 훨씬 좋습니다.
        </p>

        <div class="neighborhood-grid">
          <div class="neighborhood-card">
            <div class="neighborhood-header">
              <span class="city-flag">🇪🇸</span>
              <h4>1. 마드리드 ➔ 챔버리 (Chamberí) 또는 살라만카 (Salamanca)</h4>
            </div>
            <p><strong>이유:</strong> 마드리드의 고급 부촌 및 중산층 주거지. 솔 광장 등 구도심과 가깝고 밤늦게 걸어도 안전함. 도로 정비가 잘 되어 있어 대형 택시 호출 및 승하차가 매우 용이함.</p>
          </div>

          <div class="neighborhood-card">
            <div class="neighborhood-header">
              <span class="city-flag">🇪🇸</span>
              <h4>2. 바르셀로나 ➔ 에이샴플라 우측 구역 (Eixample Derecho)</h4>
            </div>
            <p><strong>이유:</strong> 바둑판 모양의 계획도시 구역(카탈루냐 광장 북동쪽). 가우디 건축물이 밀집한 대로변 인근으로 사방이 탁 트여 소매치기가 범행을 시도하기 어려움. 완벽한 평지 구조라 무릎에 무리가 없음.</p>
          </div>

          <div class="neighborhood-card">
            <div class="neighborhood-header">
              <span class="city-flag">🇵🇹</span>
              <h4>3. 리스본 ➔ 아베니다 대로 & 마르케스 드 폼발</h4>
            </div>
            <p><strong>이유:</strong> 리스본의 명품 대로변과 금융가 주변(Avenida da Liberdade / Marquês de Pombal). 리스본의 극심한 언덕길 공포에서 벗어날 수 있는 <strong>몇 안 되는 완벽한 평지 구역</strong>. 숙소 바로 앞에서 볼트/우버 픽업 서비스를 안전하게 이용할 수 있으며 치안이 가장 우수함.</p>
          </div>
        </div>

        <div class="callout callout-warning">
          <div class="callout-icon">🛗</div>
          <div class="callout-content">
            <strong>숙소 예약 최종 점검:</strong> 유럽 구형 건물은 엘리베이터가 없거나 초소형인 경우가 많습니다. 
            6인의 무거운 캐리어를 위해 <strong>"실제 작동하는 정상 크기의 엘리베이터(Lift)가 있는지"</strong> 후기를 통해 반드시 대조 확인하세요.
          </div>
        </div>
      </div>
    `
  },
  {
    id: "sec-8",
    number: "08",
    title: "📋 8. 비상용 아날로그 마스터 페이퍼 양식 (인쇄용 부록)",
    shortTitle: "비상용 아날로그 마스터 페이퍼",
    category: "비상/인쇄",
    badge: "A4 인쇄 보관용",
    summary: {
      keyPoints: [
        { label: "제작 목적", desc: "스마트폰 소매치기/분실/파손 상황 대비. 디지털 기기 없이도 6인 대원 신분, 보험, 긴급 연락처, 숙소 주소 즉시 확인" },
        { label: "보관 방법", desc: "A4 용지 2장으로 타이핑/인쇄 후 1~2부는 총무 및 동행자 캐리어 깊숙한 곳 분산 보관" },
        { label: "Page 1", desc: "대원 6인 여권번호 & 영문 성명, 여행자보험 가입사 & 계약번호, 해외 긴급의료지원 직통번호" },
        { label: "Page 2", desc: "주스페인 대사관(+34 913 514 133), 바르셀로나 영사관(+34 934 856 046), 주포르투갈 대사관(+351 217 937 200), 카드 분실센터, 4개 도시 숙소 주소" }
      ],
      actionItems: [
        "웹 화면 상단의 [비상 서류 인쇄/작성] 버튼을 눌러 대원 정보를 입력",
        "출국 전 A4 2장 인쇄하여 캐리어에 안전하게 수납"
      ],
      proTip: "택시 기사에게 숙소 영문 주소와 전화번호가 적힌 종이를 그대로 보여주면 의사소통 없이 목적지 앞까지 직행할 수 있습니다."
    },
    contentHtml: `
      <div class="wiki-section-body">
        <p class="lead-text">
          스마트폰 소매치기/분실 상황을 대비해 아래 양식을 타이핑하여 A4 용지 2장으로 인쇄 후 캐리어 깊숙한 곳에 보관하세요.
        </p>

        <div class="paper-page-box" id="print-paper-page-1">
          <div class="paper-header">
            <h4>[Page 1: 대원 신분 증명 및 보험 정보]</h4>
            <span class="paper-badge">A4 Sheet 1</span>
          </div>
          <div class="paper-content">
            <ul class="fillable-list">
              <li>대원 1 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>대원 2 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>대원 3 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>대원 4 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>대원 5 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>대원 6 여권번호: <code>____________________</code> / 성명(영문): <code>____________________</code></li>
              <li>여행자보험 가입사: <code>___________________________</code> / 계약번호: <code>___________________________</code></li>
              <li>해외 긴급 의료지원 센터 직통 번호: <code>__________________________________________________</code></li>
            </ul>
          </div>
        </div>

        <div class="paper-page-box" id="print-paper-page-2">
          <div class="paper-header">
            <h4>[Page 2: 현지 비상 연락처 및 숙소 주소]</h4>
            <span class="paper-badge">A4 Sheet 2</span>
          </div>
          <div class="paper-content">
            <div class="emergency-contacts-block">
              <h5>🚨 재외공관 직통 연락망</h5>
              <ul>
                <li><strong>주스페인 대사관 (마드리드):</strong> <a href="tel:+34913514133">+34 913 514 133</a></li>
                <li><strong>바르셀로나 총영사관:</strong> <a href="tel:+34934856046">+34 934 856 046</a></li>
                <li><strong>주포르투갈 대사관 (리스본):</strong> <a href="tel:+351217937200">+351 217 937 200</a></li>
              </ul>

              <h5>💳 한국 카드사 분실신고 센터</h5>
              <ul>
                <li><strong>하나카드 해외분실:</strong> <a href="tel:+8229508510">+82-2-950-8510</a></li>
                <li><strong>트래블월렛 고객센터:</strong> 앱 내 채팅 문의 채널 (동행인 폰 로그인용 계정/비번 기재: <code>____________________</code>)</li>
              </ul>

              <h5>🏨 도시별 숙소 영문 주소 및 전화번호 (택시 기사 제시용)</h5>
              <ul class="fillable-list">
                <li>마드리드 숙소: <code>__________________________________________________</code> (Tel: <code>____________</code>)</li>
                <li>바르셀로나 숙소: <code>________________________________________________</code> (Tel: <code>____________</code>)</li>
                <li>리스본 숙소: <code>__________________________________________________</code> (Tel: <code>____________</code>)</li>
                <li>포르투 숙소: <code>___________________________________________________</code> (Tel: <code>____________</code>)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="action-btn-row">
          <button type="button" class="btn btn-primary" onclick="openMasterPaperModal()">
            🖨️ 비상용 마스터 페이퍼 입력 & 인쇄 프리뷰 열기
          </button>
        </div>
      </div>
    `
  }
];

/**
 * 실무 보조 도구(Quick Tools)를 위한 상세 데이터
 * 4050 6인 스페인·포르투갈 여행 맞춤 35개 세부 필수품 체크리스트 탑재
 */
const quickToolsData = {
  // 카테고리별 여행 필수품 & 실무 체크리스트
  checklist: [
    // 1. 필수 서류 & 증명서
    { 
      id: "chk-doc-1", 
      category: "필수서류", 
      text: "여권 원본 (유효기간 출국일 기준 6개월 이상 필수 확인)", 
      tip: "유효기간이 6개월 미만이면 출국 자체가 거절될 수 있습니다." 
    },
    { 
      id: "chk-doc-2", 
      category: "필수서류", 
      text: "여권 복사본 2부 & 여권용 증명사진 2매 (캐리어 별도 보관)", 
      tip: "소매치기로 여권 분실 시 영사관 긴급 여권 발급에 필수입니다." 
    },
    { 
      id: "chk-doc-3", 
      category: "필수서류", 
      text: "해외 여행자보험 영문 증명서 인쇄본 (상해/질병/휴대품 보상)", 
      tip: "현지 병원 방문 시 영문 가입증명서가 있어야 즉시 접수 가능합니다." 
    },
    { 
      id: "chk-doc-4", 
      category: "필수서류", 
      text: "항공권(E-ticket), 도시 간 기차(렌페/CP) 및 호텔 예약 바우처 인쇄", 
      tip: "스마트폰 방전/분실 시 아날로그 종이 바우처가 최후의 보루입니다." 
    },

    // 2. 금융 & 결제
    { 
      id: "chk-fin-1", 
      category: "금융/결제", 
      text: "트래블월렛 실물 카드 발급 및 수령 (Visa 브랜드 / 메인 운영)", 
      tip: "유로 잔액 원화 환급 시 수수료가 없어 정산에 가장 유리합니다." 
    },
    { 
      id: "chk-fin-2", 
      category: "금융/결제", 
      text: "하나 트래블로그 체크카드 발급 및 수령 (Mastercard / 서브 운영)", 
      tip: "포르투갈 CP 기차 예매 및 비상 자동충전용으로 필수입니다." 
    },
    { 
      id: "chk-fin-3", 
      category: "금융/결제", 
      text: "보유 신용카드 '해외원화결제(DCC) 차단서비스' 신청 완료", 
      tip: "현지 단말기 결제 시 5~10% 이중 환전 수수료 청구를 원천 차단합니다." 
    },
    { 
      id: "chk-fin-4", 
      category: "금융/결제", 
      text: "PayPal(페이팔) 계정에 트래블카드 등록 완료", 
      tip: "스페인 렌페나 알사 버스 결제 튕김 현상을 100% 뚫어냅니다." 
    },
    { 
      id: "chk-fin-5", 
      category: "금융/결제", 
      text: "비상용 현금 유로(EUR) 소액권 환전 (인당 50~100유로)", 
      tip: "코인 라커, 공중화장실, 카드 단말기 고장 대비용 잔돈입니다." 
    },

    // 3. 소매치기 철벽 방범템 (다이소 필수템)
    { 
      id: "chk-sec-1", 
      category: "보안/방범", 
      text: "스마트폰 분실방지 스프링 스트랩 (다이소) 6인 전원 준비", 
      tip: "폰 케이스와 가방 안쪽/바지 고리에 연결해 날치기를 원천 차단합니다." 
    },
    { 
      id: "chk-sec-2", 
      category: "보안/방범", 
      text: "지퍼 잠금용 옷핀 및 S자 잠금형 카라비너 넉넉히 준비", 
      tip: "백팩/크로스백 2중 지퍼를 묶어 두면 등 뒤에서 절대 열 수 없습니다." 
    },
    { 
      id: "chk-sec-3", 
      category: "보안/방범", 
      text: "기차(렌페/CP) 짐칸 결속용 캐리어 와이어 자물쇠", 
      tip: "공용 짐칸 기둥에 캐리어 손잡이를 묶어 중간 역 도난을 방지합니다." 
    },
    { 
      id: "chk-sec-4", 
      category: "보안/방범", 
      text: "시크릿 복대 (허리 착용 슬림 벨트 파우치)", 
      tip: "비상 여권, 예비 카드, 고액 현금을 옷 안쪽에 은밀히 분산 보관합니다." 
    },
    { 
      id: "chk-sec-5", 
      category: "보안/방범", 
      text: "가슴 앞으로 매는 밀착형 슬링백 또는 도난방지 크로스백", 
      tip: "뒤로 매는 백팩은 소매치기의 타깃이 되므로 가슴 앞 착용 가방이 필수입니다." 
    },

    // 4. 전자 & 통신 기기
    { 
      id: "chk-elec-1", 
      category: "전자/통신", 
      text: "유럽용 멀티 어댑터 플러그 (C/F형 230V 콘센트 호환)", 
      tip: "스페인/포르투갈 플러그 핀 굵기가 한국보다 미세하게 얇아 헐거울 수 있습니다." 
    },
    { 
      id: "chk-elec-2", 
      category: "전자/통신", 
      text: "보조배터리 (10,000~20,000mAh, 기내 휴대 수하물 필수)", 
      tip: "구글맵과 카메라 상시 사용 시 필수! 위탁 수하물로 부치면 압수됩니다." 
    },
    { 
      id: "chk-elec-3", 
      category: "전자/통신", 
      text: "3구~4구 휴대용 멀티탭 (숙소 콘센트 부족 대비)", 
      tip: "유럽 고택 아파트는 방당 콘센트가 1~2개뿐이라 6인 충전에 필수적입니다." 
    },
    { 
      id: "chk-elec-4", 
      category: "전자/통신", 
      text: "유럽 eSIM 또는 해외 로밍 사전 등록 및 개통 확인", 
      tip: "현지 도착 직후 공항에서 우버 호출 및 가족 연락을 위해 즉시 켜져야 합니다." 
    },
    { 
      id: "chk-elec-5", 
      category: "전자/통신", 
      text: "우버(Uber) / 볼트(Bolt) 앱 설치 및 카드 등록 완료", 
      tip: "포르투갈의 살인적인 언덕길 이동 시 6인 대형 밴(XL) 호출에 즉시 사용합니다." 
    },

    // 5. 4050 맞춤 건강 & 상비약
    { 
      id: "chk-med-1", 
      category: "건강/의약", 
      text: "위장약 및 소화제 (베아제, 훼스탈 등 넉넉히)", 
      tip: "현지 음식이 올리브유 베이스라 기름져 4050 성인은 속이 더부룩하기 쉽습니다." 
    },
    { 
      id: "chk-med-2", 
      category: "건강/의약", 
      text: "지사제 (정로환 등) & 종합감기약, 해열진통제", 
      tip: "석회수 물갈이 배탈 및 10월 말 큰 일교차에 따른 초기 감기 대비 필수입니다." 
    },
    { 
      id: "chk-med-3", 
      category: "건강/의약", 
      text: "근육통 파스(붙이는 파스/바르는 멘소래담) & 대일밴드", 
      tip: "유럽 코블스톤 돌바닥을 매일 15,000보 이상 걸으므로 다리 관절 피로가 큽니다." 
    },
    { 
      id: "chk-med-4", 
      category: "건강/의약", 
      text: "의료용 종아리 압박스타킹 (수면용)", 
      tip: "취침 시 착용하면 하루 종일 부은 다리의 피로를 하룻밤 만에 씻은 듯 풀어줍니다." 
    },
    { 
      id: "chk-med-5", 
      category: "건강/의약", 
      text: "개인 복용 만성질환약 (혈압약, 당뇨약 등 + 영문 처방전 지참)", 
      tip: "비행기 지연을 대비해 최소 2~3일 여유분을 본인 기내 가방에 소지하세요." 
    },

    // 6. 의류 & 신발 (10월 말 가을철)
    { 
      id: "chk-clo-1", 
      category: "의류/신발", 
      text: "최상급 쿠션 러닝화 또는 트래킹화 전원 착용 (단화/구두 절대 금지)", 
      tip: "울퉁불퉁한 돌바닥 충격 흡수를 위해 두툼한 에어 쿠션 신발이 무조건 필수입니다." 
    },
    { 
      id: "chk-clo-2", 
      category: "의류/신발", 
      text: "가을철 레이어드 룩 (가디건, 가벼운 바람막이, 초경량 패딩)", 
      tip: "낮에는 뜨겁고 아침/저녁 및 그늘은 쌀쌀하므로 입고 벗기 편하게 겹쳐 입습니다." 
    },
    { 
      id: "chk-clo-3", 
      category: "의류/신발", 
      text: "실내용 가벼운 슬리퍼 (유럽 호텔/에어비앤비 미제공 대비)", 
      tip: "유럽 숙소는 신발을 신고 생활하는 구조이므로 실내 슬리퍼가 없으면 매우 불편합니다." 
    },
    { 
      id: "chk-clo-4", 
      category: "의류/신발", 
      text: "선글라스 및 자외선 차단제 (스페인의 강렬한 가을 햇살)", 
      tip: "이베리아 반도는 가을에도 자외선이 강해 야외 투어 시 눈 보호가 필수적입니다." 
    },
    { 
      id: "chk-clo-5", 
      category: "의류/신발", 
      text: "초경량 접이식 우산 (가을철 기습 소나기 대비)", 
      tip: "포르투 등 대서양 연안 도시는 가을에 비가 잦으므로 가방에 1개씩 소지하세요." 
    },

    // 7. 한식 비상식량 & 생활 위생용품
    { 
      id: "chk-food-1", 
      category: "음식/위생", 
      text: "튜브형 볶음고추장, 소포장 김, 컵라면, 믹스커피 비상식량", 
      tip: "현지 음식 느끼함 해소 및 숙소에서 6인 팀의 활력소가 되어줍니다." 
    },
    { 
      id: "chk-food-2", 
      category: "음식/위생", 
      text: "휴대용 물티슈 및 포켓 티슈 넉넉히 준비", 
      tip: "유럽 식당은 물티슈를 주지 않으며, 공중화장실에 휴지가 없는 경우가 잦습니다." 
    },
    { 
      id: "chk-food-3", 
      category: "음식/위생", 
      text: "손소독제 & 덴탈마스크 (장거리 비행기 기내 및 대중교통)", 
      tip: "건조한 기내 및 밀폐된 관광지에서 호흡기 위생 관리에 탁월합니다." 
    },
    { 
      id: "chk-food-4", 
      category: "음식/위생", 
      text: "장거리 비행용 목베개, 안대, 소음 차단 귀마개", 
      tip: "12~14시간 비행 동안 숙면을 취해야 첫날 시차 적응과 일정 소화가 가능합니다." 
    },
    { 
      id: "chk-food-5", 
      category: "음식/위생", 
      text: "빨래감 분리용 지퍼백 & 비닐봉투", 
      tip: "6인 대인원의 입은 옷과 젖은 옷을 깔끔하게 캐리어에 분리 수납할 수 있습니다." 
    }
  ],

  // 서바이벌 핵심 회화 (음성 합성 지원)
  phrases: [
    {
      lang: "es",
      langLabel: "스페인어",
      phrase: "Sin sal, por favor.",
      pronunciation: "씬 살, 포르 파보르",
      meaning: "소금 빼주세요 (빠에야 주문 시 필수)",
      situation: "식당 주문"
    },
    {
      lang: "es",
      langLabel: "스페인어",
      phrase: "En euros, por favor.",
      pronunciation: "엔 에우로스, 포르 파보르",
      meaning: "유로화로 결제해 주세요 (DCC 수수료 차단)",
      situation: "카드 결제"
    },
    {
      lang: "es",
      langLabel: "스페인어",
      phrase: "Agua sin gas, grande, por favor.",
      pronunciation: "아구아 신 가스, 그란데, 포르 파보르",
      meaning: "탄산 없는 일반 생수 큰 병으로 주세요",
      situation: "식당 주문"
    },
    {
      lang: "es",
      langLabel: "스페인어",
      phrase: "La cuenta, por favor.",
      pronunciation: "라 꾸엔따, 포르 파보르",
      meaning: "계산서 주세요",
      situation: "식당 계산"
    },
    {
      lang: "es",
      langLabel: "스페인어",
      phrase: "¡No, gracias!",
      pronunciation: "노, 그라시아스!",
      meaning: "됐습니다! (소매치기 접근 시 단호하게)",
      situation: "치안/거절"
    },
    {
      lang: "pt",
      langLabel: "포르투갈어",
      phrase: "Água sem gás, por favor.",
      pronunciation: "아구아 셍 가스, 포르 파보르",
      meaning: "탄산 없는 물 주세요",
      situation: "리스본/포르투 식당"
    },
    {
      lang: "pt",
      langLabel: "포르투갈어",
      phrase: "A conta, por favor.",
      pronunciation: "아 꼰따, 포르 파보르",
      meaning: "계산서 부탁합니다",
      situation: "리스본/포르투 식당"
    },
    {
      lang: "pt",
      langLabel: "포르투갈어",
      phrase: "Obrigado (남성) / Obrigada (여성)",
      pronunciation: "오브리가두 / 오브리가다",
      meaning: "감사합니다",
      situation: "인사"
    }
  ],

  // 재외공관 및 긴급 연락망
  contacts: [
    { name: "주스페인 대한민국 대사관 (마드리드)", tel: "+34 913 514 133", desc: "영사과 비상전화 (+34 647 812 770)" },
    { name: "바르셀로나 대한민국 총영사관", tel: "+34 934 856 046", desc: "사건사고 긴급전화 (+34 682 862 431)" },
    { name: "주포르투갈 대한민국 대사관 (리스본)", tel: "+351 217 937 200", desc: "당직 긴급전화 (+351 910 795 055)" },
    { name: "외교부 영사콜센터 (24시간 한국)", tel: "+82 2 3210 0404", desc: "무료 연결 앱 또는 국가번호 82" },
    { name: "하나카드 해외 분실신고 센터", tel: "+82 2 950 8510", desc: "트래블로그 카드 분실 시 24시간" },
    { name: "트래블월렛 고객센터", tel: "앱 내 1:1 채팅 문의", desc: "동행인 스마트폰으로 로그인하여 문의" }
  ]
};
