export interface CommunityItem {
  id: string;
  cat: string;
  type: 'notice' | 'press';
  title: string;
  date: string;
  desc: string;
  content: string[];
}

export function getCommunityItems(locale: string = 'ko'): CommunityItem[] {
  const isKo = locale === 'ko';

  return [
    {
      id: 'notice-01',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? 'APAP8 공식 홈페이지 오픈 및 참여 작가 공개'
        : 'APAP8 Official Website Launch & Artist Announcement',
      date: '2026.09.14',
      desc: isKo
        ? '제8회 안양공공예술프로젝트 공식 웹사이트가 정식 오픈되었습니다. 야외전시 및 특별기획전에 참여하는 총 31명 작가 정보와 주요 출품작을 확인하실 수 있습니다.'
        : 'The official platform for APAP8 has launched. Discover details on 31 participating artists and exhibition venues.',
      content: isKo
        ? [
            '제8회 안양공공예술프로젝트(APAP8)의 공식 웹사이트가 정식으로 오픈되었습니다.',
            '이번 웹사이트에서는 ‘ArteX : 예술대전환’(부제: 안양 무릉도원)을 주제로 펼쳐지는 APAP8의 전체 기획 의도와 함께, 안양파빌리온(아이 파빌리온), 야외전시(오픈 그라운드), 308아트(밤의 도원경), 한중특별전(우리가 꿈꾸는 도원) 등 4대 전시 구역과 31인/팀의 참여 작가, 10팀의 미디어아트 공모 선정작 정보를 상세히 확인하실 수 있습니다.',
            '또한 시민참여 프로그램, 도슨트 투어, 공공예술 토론회 및 관람 안내 등 다채로운 프로그램 정보가 지속적으로 업데이트될 예정이오니 시민 여러분의 많은 관심과 참여를 부탁드립니다.',
          ]
        : [
            'The official website for the 8th Anyang Public Art Project (APAP8) has officially launched.',
            'This platform provides comprehensive information on APAP8, unfolding under the theme "ArteX : Art Transformation" (Subtitle: Anyang Peach Blossom Spring). Explore the 4 major exhibition zones—i Pavilion, Open Ground, Night Utopia, and Special Exhibition—along with profiles of 31 participating artists/teams and 10 media art competition winners.',
            'Information on civic engagement workshops, docent tours, forums, and visitor guidelines will be continually updated. We welcome your warm interest and participation.',
          ],
    },
    {
      id: 'notice-02',
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo
        ? '[보도자료] 제8회 안양공공예술프로젝트 개막 발표'
        : '[Press Release] The 8th Anyang Public Art Project Opens',
      date: '2026.09.14',
      desc: isKo
        ? '안양문화예술재단은 ‘ArteX : 예술대전환’(부제: 안양 무릉도원)을 주제로 3년 만에 개최되는 트리엔날레의 종합 프레스킷을 배포합니다.'
        : 'Anyang Foundation for Culture & Arts releases the official press kit for APAP8 under the theme "ArteX : Art Transformation".',
      content: isKo
        ? [
            '안양문화예술재단은 오는 9월 30일(수) 개막하는 제8회 안양공공예술프로젝트(APAP8)의 개막 소식과 함께 종합 프레스킷을 공식 배포합니다.',
            '2005년부터 3년마다 개최되어 올해로 20여 년의 역사를 맞이한 국내 유일의 공공예술 트리엔날레 APAP는 이번 8회 행사에서 박철희 예술감독의 지휘 아래 예술과 첨단기술, 자연과 시민이 함께 어우러지는 현대 공공예술의 대전환을 제시합니다.',
            '개막식은 2026년 9월 30일(수) 18:00 안양파빌리온 앞 벽천광장에서 개최되며, 308 아트크루의 야외 레이저·미디어아트 개막 퍼포먼스를 시작으로 11월 29일까지 61일간 안양예술공원 전역에서 펼쳐집니다.',
          ]
        : [
            'Anyang Foundation for Culture & Arts officially releases the comprehensive press kit announcing the opening of the 8th Anyang Public Art Project (APAP8) on Wednesday, September 30, 2026.',
            'As Korea’s only public art triennial held continuously since 2005, celebrating over 20 years of history, APAP8 introduces a major paradigm shift in contemporary public art under Artistic Director Park Chul-hee.',
            'The opening ceremony will take place on September 30, 2026, at 18:00 at Cascade Square in front of Anyang Pavilion, followed by a monumental 61-day exhibition across Anyang Art Park through November 29.',
          ],
    },
    {
      id: 'notice-03',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '개막 주간 도원 릴레이 및 도슨트 투어 신청 안내'
        : 'Opening Week Dowon Relay & Docent Tour Registration',
      date: '2026.09.07',
      desc: isKo
        ? '도원 릴레이 시민참여 프로그램 및 주말 정기 도슨트 투어 참여 접수가 시작됩니다. 전 프로그램은 시민 누구나 무료로 참여하실 수 있습니다.'
        : 'Registration opens for Dowon Relay civic engagement programs and weekend guided tours. Free for all citizens.',
      content: isKo
        ? [
            'APAP8 개막 주간을 맞아 시민과 함께하는 퍼블릭 프로그램 \'도원 릴레이\' 및 정기 도슨트 투어의 사전 참가 신청 접수를 시작합니다.',
            '■ 정규 도슨트 투어 (무료)\n- 운영: 매일 11:00 / 14:00 / 16:00 (1일 3회, 회당 45분)\n- 코스: 안양파빌리온 및 야외 주요 설치 작품 해설',
            '■ 특별전 해설 (무료)\n- 운영: 10:30~16:40 (매시 00, 20, 40분 진행, 10분 코스)\n- 장소: 오감갤러리 및 학운공원 오픈스쿨',
            '■ 스페셜 나이트 투어 (유료 5,000원)\n- 운영: 10.16 ~ 11.6 매주 금요일 19:00 (90분 코스)\n- 코스: APAP 역사적 명작 및 야간 〈밤의 도원경〉 관람',
            '모든 정규 프로그램은 현장 참여 및 단체 사전 예약이 가능하며, 상세 문의는 안양문화예술재단 APAP 사업부(031-687-0548)로 문의해 주시기 바랍니다.',
          ]
        : [
            'Registration has opened for the "Dowon Relay" civic engagement programs and weekend guided docent tours celebrating APAP8.',
            '■ Regular Docent Tours (Free): Daily at 11:00 / 14:00 / 16:00 (3 times daily, approx. 45 min).\n■ Special Exhibition Docent (Free): 10:30–16:40 (every 20 min).\n■ Special Night Tour (Paid KRW 5,000): Every Friday 19:00 from Oct 16 to Nov 6 (90 min).',
            'Inquiries: Anyang Foundation for Culture & Arts APAP Division (031-687-0548).',
          ],
    },
    {
      id: 'notice-04',
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo
        ? '[보도자료] 김덕한 작가 APAP8 신작 조각 야외 설치 완료'
        : '[Press] Artist Kim Deok Han Installs New Outdoor Sculpture',
      date: '2026.08.30',
      desc: isKo
        ? '한국 현대미술의 대표 작가 김덕한의 대형 공공조각 <OVERLAID : 공존의 균형>이 안양예술공원 숲속 산책로에 성공적으로 안착했습니다.'
        : 'Kim Deok Han completes installation of his monumental sculpture in Anyang Art Park.',
      content: isKo
        ? [
            '한국 현대미술의 대표 작가 김덕한의 대형 공공조각 <OVERLAID : 공존의 균형>이 안양예술공원 숲속 산책로에 성공적으로 설치를 마쳤습니다.',
            '본 작품은 오방색으로 구성된 수직 구체 구조와 중앙 자연석의 배치를 통해 시간, 기억, 관계의 중첩을 시각화한 작품입니다. 자연과 도시의 경계에서 균형과 상생의 메시지를 전합니다.',
            '안양예술공원 산책로 야외 공간에 설치되어 24시간 언제나 자유롭게 감상하실 수 있습니다.',
          ]
        : [
            'Prominent Korean contemporary artist Kim Deok Han has completed installation of his large-scale public sculpture <OVERLAID : Harmony in Coexistence> along the forest trails of Anyang Art Park.',
            'Utilizing spheres in the five traditional Korean colors (Obangsaek) and natural stone, the sculpture visualizes the layered dimensions of time, memory, and coexistence.',
            'Installed in open outdoor park space, the work is freely accessible to the public 24 hours a day.',
          ],
    },
    {
      id: 'notice-05',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? 'APAP 서포터즈 <도원지기> 1차 서류 합격자 발표'
        : 'APAP Supporters <Dowonjigi> 1st Selection Results',
      date: '2026.08.20',
      desc: isKo
        ? '제8회 안양공공예술프로젝트와 함께할 청년 서포터즈 <도원지기> 모집에 응해주신 모든 분들께 감사드립니다. 면접 일정을 개별 안내드립니다.'
        : 'Thank you to all applicants for the APAP8 Youth Supporters <Dowonjigi>. Individual interview notices have been sent.',
      content: isKo
        ? [
            '제8회 안양공공예술프로젝트(APAP8)와 함께할 청년 서포터즈 <도원지기> 모집에 응해주신 모든 지원자 여러분께 진심으로 감사드립니다.',
            '서류 심사 결과 및 2차 인터뷰 면접 일정은 지원서에 기재해 주신 개별 연락처(이메일 및 SMS)로 개별 발송되었습니다.',
            '선발된 서포터즈는 개막 준비부터 전시 운영, 도슨트 지원, 시민 참여 프로그램 및 SNS 홍보 등 다방면에서 프로젝트의 핵심 일원으로 활동하게 됩니다.',
          ]
        : [
            'We extend our sincere gratitude to all applicants for the APAP8 Youth Supporters program, <Dowonjigi>.',
            'First-round document evaluation results and second-round interview schedules have been sent to applicants via email and SMS.',
            'Selected supporters will participate actively in exhibition operations, docent assistance, and public communication throughout the triennial.',
          ],
    },
    {
      id: 'notice-06',
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo
        ? '[보도자료] 안양예술공원 내 APAP8 공공조각 보존수복 프로젝트 완료'
        : '[Press] Completion of Public Sculpture Restoration in Anyang Art Park',
      date: '2026.08.15',
      desc: isKo
        ? '역대 APAP 영구 설치 조각 중 12점에 대한 정밀 클리닝 및 보존수복 작업을 완료하여 더욱 쾌적한 야외 관람 환경을 조성했습니다.'
        : 'Conservation and cleaning of 12 permanent works in Anyang Art Park completed for enhanced viewing experience.',
      content: isKo
        ? [
            '안양문화예술재단은 역대 APAP(1회~7회)를 통해 안양예술공원에 영구 설치된 주요 공공예술 작품 중 보존 처리가 시급했던 12점에 대한 정밀 클리닝 및 복원 수복 작업을 완료했습니다.',
            '이번 보존수복은 공공미술 전문가와 협력하여 작가의 본래 조형 의도와 재료적 특성을 철저히 존중하면서 친환경 보존 기술을 적용하여 진행되었습니다.',
            '수복을 마친 작품들은 APAP8 신작들과 함께 더욱 생생하고 쾌적한 야외 미술관의 면모를 관람객들에게 선보입니다.',
          ]
        : [
            'Anyang Foundation for Culture & Arts has completed the meticulous restoration and conservation of 12 major permanent public artworks from previous APAP editions (1st–7th).',
            'Carried out with leading conservation specialists, the restoration respects the original artistic materials while applying eco-friendly protective coatings.',
            'These restored masterpieces now harmonize seamlessly with APAP8 new commissions across the park.',
          ],
    },
    {
      id: 'notice-07',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '안양 무릉도원 숏폼 영상 공모전 접수 시작'
        : 'Anyang Peach Blossom Spring Short-form Video Contest Open',
      date: '2026.08.01',
      desc: isKo
        ? '시민의 시선으로 담아낸 안양예술공원과 공공예술의 매력을 공유하는 숏폼 영상 공모전을 개최합니다. 총 상금 1,000만 원 규모입니다.'
        : 'Submit your creative short-form videos highlighting Anyang Art Park and public artworks. Total prize pool 10M KRW.',
      content: isKo
        ? [
            '시민의 창의적인 시선으로 안양예술공원과 공공예술의 매력을 재발견하는 《안양 무릉도원 숏폼 영상 공모전》을 개최합니다.',
            '■ 공모 주제: 내가 찾은 일상 속 무릉도원, 안양예술공원과 APAP 작품 이야기\n■ 접수 기간: 2026.08.01 ~ 2026.09.15\n■ 참가 대상: 국민 누구나 (개인 또는 팀 단위)\n■ 총 상금: 1,000만 원 (대상 1팀 300만 원, 최우수상 2팀 각 150만 원 등)',
            '자세한 접수 양식 및 공모 규정은 재단 홈페이지 공지사항 첨부파일을 참조하시기 바랍니다.',
          ]
        : [
            'Anyang Foundation for Culture & Arts announces the "Anyang Peach Blossom Spring Short-form Video Contest", inviting citizens to share their creative perspectives on Anyang Art Park and APAP public art.',
            '■ Theme: Paradise Found in Everyday Life: Stories of Anyang Art Park & APAP\n■ Submission Period: Aug 1 – Sept 15, 2026\n■ Eligibility: Open to all\n■ Total Prize Pool: KRW 10,000,000',
            'Detailed submission guidelines are available on the foundation website.',
          ],
    },
    {
      id: 'notice-08',
      cat: isKo ? '프레스' : 'Press',
      type: 'press',
      title: isKo
        ? '[보도자료] KBS <열린음악회> APAP8 특집 안양 녹화 확정'
        : '[Press] KBS <Open Concert> Confirmed for APAP8 Special Broadcast',
      date: '2026.07.25',
      desc: isKo
        ? '오는 9월 30일 개막식과 연계하여 안양예술공원 특설무대에서 KBS 열린음악회 APAP8 특집 녹화가 진행됩니다.'
        : 'KBS Open Concert special recording confirmed at Anyang Art Park on Sept 30 in conjunction with the opening ceremony.',
      content: isKo
        ? [
            '오는 9월 30일(수) APAP8 개막을 축하하며, KBS 1TV 대표 프로그램인 <열린음악회> APAP8 특집 녹화가 안양예술공원 야외 특설무대에서 진행됩니다.',
            '국내 최정상급 아티스트들과 오케스트라가 참여하는 본 공연은 가을밤 안양예술공원의 수려한 자연 경관과 조화를 이루는 특별한 음악 축제가 될 것입니다.',
            '안양시민을 위한 무료 티켓 배부 일정은 9월 초 공식 홈페이지를 통해 별도 공지될 예정입니다.',
          ]
        : [
            'In celebration of the opening of APAP8 on September 30, KBS 1TV\'s acclaimed program "Open Concert" will record a special feature at Anyang Art Park\'s outdoor stage.',
            'Featuring prominent musicians and orchestras, the concert will offer an unforgettable evening of art and melody nestled in the park’s natural scenery.',
            'Free admission ticket booking details for Anyang residents will be announced in early September.',
          ],
    },
  ];
}
