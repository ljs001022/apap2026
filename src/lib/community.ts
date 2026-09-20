export interface CommunityItem {
  id: string;
  cat: string;
  type: 'notice' | 'press';
  title: string;
  date: string;
  desc: string;
  content: string[];
  pdfUrl?: string;
  pdfDownloadName?: string;
  pdfSize?: string;
  previewType?: 'image' | 'pdf' | 'download_only' | 'video';
  previewImage?: string;
  videoUrl?: string;
}

export function getCommunityItems(locale: string = 'ko'): CommunityItem[] {
  const isKo = locale === 'ko';

  return [
    // 1. 개막식 안내 (Opening Ceremony Guide)
    {
      id: 'notice-opening',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '안양공공예술프로젝트(APAP8) 개막식 안내'
        : 'The 8th Anyang Public Art Project (APAP8) Opening Ceremony Guide',
      date: '2026.09.20',
      desc: isKo
        ? '제8회 안양공공예술프로젝트(APAP8) 《Arte X : 예술 대전환_안양 무릉도원》의 시작을 알리는 개막식에 시민 여러분을 초대합니다.'
        : 'Invitation to the Opening Ceremony of the 8th Anyang Public Art Project (APAP8) "Arte X : Art Transformation_Anyang Paradise".',
      pdfUrl: '/notice/apap8_invitation.pdf',
      pdfDownloadName: 'APAP8_개막식_초청장.pdf',
      pdfSize: '1.2 MB',
      previewType: 'pdf',
      content: isKo
        ? [
            '제8회 안양공공예술프로젝트(APAP8) 《Arte X : 예술 대전환_안양 무릉도원》의 시작을 알리는 개막식에 시민 여러분을 초대합니다.',
            '• 일시: 2026년 9월 30일(수) 17:00\n• 장소: 안양예술공원 벽천광장 특설무대\n• 주요 식순: 식전 공연, 개막 선언 및 축사, 참여 작가 소개, 개막 퍼포먼스 및 점등식\n• 문의: 안양문화예술재단 공공예술부 (031-687-0548)',
            '시민과 예술가가 함께 어우러지는 뜻깊은 개막 행사에 많은 관심과 참석을 부탁드립니다.',
          ]
        : [
            'We cordially invite you to the opening ceremony of the 8th Anyang Public Art Project (APAP8) "Arte X : Art Transformation_Anyang Paradise".',
            '• Date & Time: Wednesday, September 30, 2026, 17:00\n• Location: Anyang Art Park Cascade Square Special Stage\n• Program: Pre-ceremony performance, opening declaration & congratulatory remarks, artist introduction, opening performance & lighting ceremony\n• Inquiries: Anyang Foundation for Culture & Arts Public Art Department (031-687-0548)',
            'We warmly welcome your presence and participation in this memorable opening celebration where citizens and artists unite.',
          ],
    },
    // 2. 공식 리플렛 (Exhibition Leaflet)
    {
      id: 'notice-leaflet',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '제8회 안양공공예술프로젝트(APAP8) 공식 리플렛(전시 안내)'
        : 'The 8th Anyang Public Art Project (APAP8) Official Exhibition Leaflet',
      date: '2026.09.18',
      desc: isKo
        ? 'APAP8의 전체 전시 구역과 주요 프로그램 정보를 한눈에 확인할 수 있는 공식 리플렛을 공개합니다.'
        : 'Official exhibition leaflet covering all exhibition zones, participating artists, and visitor guides for APAP8.',
      pdfUrl: '/notice/apap8_leaflet.pdf',
      pdfDownloadName: 'APAP8_공식_리플렛.pdf',
      pdfSize: '10.8 MB',
      previewType: 'download_only',
      content: isKo
        ? [
            '제8회 안양공공예술프로젝트(APAP8)의 전체 전시 구역과 주요 프로그램 정보를 한눈에 확인할 수 있는 공식 리플렛을 공개합니다.',
            '이번 리플렛은 관람객 여러분이 안양예술공원 일대에 펼쳐진 야외 조각 및 실내 미디어 전시를 편리하게 탐방하실 수 있도록 제작되었습니다.',
            '[주요 수록 내용]\n• 전시 구역 안내 : 안양파빌리온(아이 파빌리온), 야외전시(오픈 그라운드), 308아트(밤의 도원경) 등\n• APAP8 참여 작가 명단 및 주요 대표작 소개\n• 시민 참여 프로그램, 도슨트 투어, 셔틀버스 운행 시간표\n• 관람 편의시설 및 오시는 길 안내',
            '공식 리플렛 PDF 파일은 본 공지사항 첨부파일 및 홈페이지 내 [전시 안내] 메뉴에서 다운로드하실 수 있으며, 행사 기간 중 안양파빌리온 및 현장 종합안내소에서도 실물 책자를 수령하실 수 있습니다.',
          ]
        : [
            'We are pleased to release the official exhibition leaflet providing comprehensive details on APAP8 zones and programs.',
            'This guide is designed to help visitors seamlessly navigate outdoor sculptures and indoor media installations throughout Anyang Art Park.',
            '[Key Contents]\n• Exhibition Zones: Anyang Pavilion (i Pavilion), Open Ground, 308 Art (Night Utopia), etc.\n• Participating Artists and Major Artworks\n• Civic Participation Programs, Docent Tour Schedules, and Shuttle Bus Timetable\n• Visitor Amenities and Access Directions',
            'The digital leaflet PDF can be downloaded on the website, and physical copies are available at Anyang Pavilion and information desks during the event.',
          ],
    },
    // 3. 키비주얼 (Key Visual Poster)
    {
      id: 'notice-keyvisual',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '제8회 안양공공예술프로젝트(APAP8) 공식 키비주얼 공개'
        : 'The 8th Anyang Public Art Project (APAP8) Official Key Visual Released',
      date: '2026.09.16',
      desc: isKo
        ? '제8회 안양공공예술프로젝트(APAP8)의 공식 메인 포스터(키비주얼)를 공개합니다. 기획 주제인 「Arte X : 예술 대전환_안양 무릉도원」을 시각적으로 구현했습니다.'
        : 'Unveiling the official key visual for APAP8, visually embodying the curatorial theme "Arte X : Art Transformation_Anyang Paradise".',
      pdfUrl: '/notice/poster_A2_yellow_CMYK.pdf',
      pdfDownloadName: 'APAP8_공식포스터_키비주얼_A2.pdf',
      pdfSize: '7.8 MB',
      previewType: 'pdf',
      content: isKo
        ? [
            '제8회 안양공공예술프로젝트(APAP8)의 공식 메인 포스터(키비주얼)를 공개합니다.',
            '이번 메인 키비주얼은 APAP8의 기획 주제인 「Arte X : 예술 대전환_안양 무릉도원」을 시각적으로 구현하는 데 중점을 두었습니다. 예술과 도시, 그리고 자연이 만나 새롭게 탄생할 \'안양 무릉도원\'의 풍경을 자연·예술·기술의 융합이라는 콘셉트로 역동적으로 담아냈습니다.',
            '특히, 이번 포스터는 융복합 공공예술의 이미지를 대중이 보다 흥미롭게 감상하실 수 있도록 세 가지 주요 디자인 요소를 곳곳에 숨겨두었습니다.',
            '• 건축물과 타이포그래피의 결합 : 안양예술공원의 대표 건축물인 ‘안양파빌리온’의 형태를 한글 자음 ‘ㅇ(이응)’과 결합하여 도시와 건축의 상징성을 조형적으로 표현했습니다.\n• 자연과 예술의 생명력 : 안양천을 유영하는 물고기의 꼬리 지느러미 형상을 모티프로 삼아, 자연 생태와 예술적 상상력이 만나는 생명력을 시각화했습니다.\n• 첨단기술을 통한 예술 대전환 : 캔버스 중앙에 배치된 문(Gate)을 통과하는 순간 기술을 통해 새롭게 펼쳐지는 \'예술 대전환(Transformation)\'의 공간적 이동과 확장을 은유적으로 나타냈습니다.',
            '이 밖에도 전통적인 무릉도원의 상징인 복숭아 열매의 다채로운 색감(분홍, 파랑 등)을 현대적이고 미래지향적인 그라데이션으로 재해석하여, \'기술을 품은 현대의 도원경\'을 환상적인 색채로 완성했습니다.',
            'APAP8 메인 포스터는 공식 홈페이지 및 SNS를 통해 확인하실 수 있으며, 프로젝트 개막과 함께 온·오프라인의 다양한 채널에서 만나보실 수 있습니다. 시민 여러분의 많은 관심과 기대 부탁드립니다.',
          ]
        : [
            'We are pleased to unveil the official main poster (key visual) for the 8th Anyang Public Art Project (APAP8).',
            'The key visual focuses on visually manifesting APAP8’s curatorial theme, "Arte X : Art Transformation_Anyang Paradise." It dynamically captures the landscape of "Anyang Utopia" where art, city, and nature converge through the integration of nature, art, and cutting-edge technology.',
            'The poster incorporates three key symbolic design elements:',
            '• Architectural & Typographic Harmony: Reinterpreting the silhouette of the iconic Anyang Pavilion combined with the Korean consonant \'ㅇ\' (ieung).\n• Vitality of Nature and Art: Visualizing ecological vitality through the motif of a fish fin gliding through the Anyang Stream.\n• Art Transformation via Technology: Metaphorically portraying spatial expansion and artistic paradigm shift as one passes through the central gateway.',
            'Furthermore, the traditional shades of the utopian peach (pink, blue) are reinterpreted into modern, futuristic gradients, completing a fantastic vision of contemporary paradise embraced by technology.',
            'The APAP8 official poster is available on our website and social channels. We look forward to your warm interest and anticipation.',
          ],
    },
    // 4. 기획 다큐멘터리 방영 및 다시보기 안내 (KBS 1TV Documentary)
    {
      id: 'notice-documentary',
      cat: isKo ? '공지' : 'Notice',
      type: 'notice',
      title: isKo
        ? '[공지] APAP8 기획 다큐멘터리 KBS 1TV <예술로 길을 열다> 방영 및 다시보기 안내'
        : '[Notice] APAP8 Special Documentary KBS 1TV <Opening the Way with Art> Broadcast & Replay',
      date: '2026.08.31',
      desc: isKo
        ? 'KBS 1TV 네트워크 기획 <예술로 길을 열다>를 통해 방영된 제8회 안양공공예술프로젝트(APAP8)의 발자취와 비전, 그리고 다시보기 영상을 안내해 드립니다.'
        : 'Information and replay link for the APAP8 special documentary <Opening the Way with Art> broadcast on KBS 1TV.',
      videoUrl: 'https://www.youtube.com/watch?v=4zB7LXO7Ydo',
      previewType: 'video',
      content: isKo
        ? [
            '지난 8월 29일(토), KBS 1TV 네트워크 기획 <예술로 길을 열다>를 통해 제8회 안양공공예술프로젝트(APAP8)의 발자취와 비전이 전국에 방영되었습니다.',
            '이번 다큐멘터리에서는 인구 절벽과 지방 소멸이라는 시대적 과제 앞서, 공공예술의 거대한 실험실인 \'안양(APAP)\'을 비롯해 제주, 중국 베이징, 일본 나오시마가 찾아낸 해답을 심도 있게 조명했습니다. 단절된 공간과 사람을 다시 연결하는 완벽한 매개체로서, 공공예술이 그려내는 지속 가능한 도시의 미래 비전을 담아냈습니다.',
            '아쉽게 본방송을 놓치셨거나 감동적인 현장을 다시 만나고 싶으신 분들은 아래 링크를 통해 전체 다큐멘터리 영상을 시청하실 수 있습니다.',
            '▶ 다큐멘터리 전체 영상 다시보기: https://www.youtube.com/watch?v=4zB7LXO7Ydo',
            '[방송 개요]\n• 프로그램: KBS 1TV 네트워크 기획 <예술로 길을 열다>\n• 방 영 일: 2026. 8. 29.(토) 오후 1:05',
            '다큐멘터리를 통해 소개된 공공예술의 생생한 현장은 오는 9월 30일 개막하는 APAP8 전시에서 직접 경험하실 수 있습니다. 시민 여러분의 많은 관심과 성원 부탁드립니다.\n감사합니다.',
          ]
        : [
            'On Saturday, August 29, the network documentary special <Opening the Way with Art> aired nationwide on KBS 1TV, highlighting the legacy and vision of the 8th Anyang Public Art Project (APAP8).',
            'Confronting modern demographic and regional challenges, this documentary deeply explored the solutions found by Anyang (APAP) as a living public art laboratory, alongside Jeju, Beijing (China), and Naoshima (Japan). It captures a sustainable future vision for cities through public art that reconnects severed spaces and communities.',
            'For those who missed the broadcast or wish to revisit the experience, the full documentary is available via the link below.',
            '▶ Full Documentary Replay: https://www.youtube.com/watch?v=4zB7LXO7Ydo',
            '[Broadcast Summary]\n• Program: KBS 1TV Network Special <Opening the Way with Art>\n• Air Date: Saturday, August 29, 2026, 13:05 KST',
            'The vibrant scenes of public art introduced in this documentary can be experienced in person at the APAP8 exhibition opening on September 30. We appreciate your interest and support.\nThank you.',
          ],
    },
  ];
}
