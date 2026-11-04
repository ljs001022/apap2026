export interface NovemberProgramItem {
  date: string;
  title: string;
  times: string;
  desc: string;
}

export const NOVEMBER_POSTER = { src: '/images/programs/november-1.webp', alt: '도원 릴레이 11월 프로그램 일정 포스터' };

export function getNovemberPrograms(isKo: boolean): NovemberProgramItem[] {
  return [
    {
      date: isKo ? '11. 7.(토)' : 'Sat, Nov 7',
      title: isKo ? '스텐실 파우치 키트 체험 《나만의 안양 무릉도원》' : 'Stencil Pouch Kit Workshop “Create Your Own Anyang Utopia”',
      times: isKo ? '1회차 14:00–15:00 · 2회차 15:30–16:30' : 'Session 1 14:00–15:00 · Session 2 15:30–16:30',
      desc: isKo
        ? '전문 에듀케이터와 함께 스텐실 기법으로 자신만의 감각과 색채를 담은 파우치를 제작하는 체험 프로그램'
        : 'A hands-on workshop where participants create one-of-a-kind pouches using stencil techniques, incorporating their own artistic sensibilities and color palettes.',
    },
    {
      date: isKo ? '11. 11.(수)' : 'Wed, Nov 11',
      title: isKo ? '도원 키즈데이 《도원의 호박정원 – 가을 수확 축제》' : 'Dowon Kids Day “The Pumpkin Garden of Dowon – Autumn Harvest Festival”',
      times: isKo
        ? '호박 쿠키 마그넷 1회차 10:00–11:00 · 2회차 14:00–15:00 / 컬러링 키트 1회차 11:30–12:30 · 2회차 15:30–16:30'
        : 'Pumpkin cookie magnet: 10:00–11:00 · 14:00–15:00 / Coloring kit: 11:30–12:30 · 15:30–16:30',
      desc: isKo
        ? '호박 쿠키 마그넷 만들기 및 컬러링 키트 체험 (대상: 어린이집·유치원 등 미취학 유아, 기관 단위 참여 우선 배정)'
        : 'Pumpkin cookie magnet making and coloring kit activities (for preschool children; priority given to group applications from institutions).',
    },
    {
      date: isKo ? '11. 13.(금)' : 'Fri, Nov 13',
      title: isKo ? '미디어아트·AI 교육 《프롬프트 도원경》' : 'Media Art & AI Education “Prompted Paradise”',
      times: '14:00–16:00',
      desc: isKo
        ? 'APAP8 참여 작가 진진아와 함께 안양의 풍경을 AI 이미지로 재해석하고, 디지털 기술을 활용해 자신만의 무릉도원을 구현하는 교육 프로그램'
        : 'Together with APAP8 participating artist Jin Jin Ah, participants reinterpret the landscapes of Anyang through AI-generated images and use digital technology to create their own personal utopia.',
    },
    {
      date: isKo ? '11. 21.(토)' : 'Sat, Nov 21',
      title: isKo ? '작가 창작 워크숍 《옻, 시간을 입히다》' : 'Artist-Led Creative Workshop “Lacquer: Layers of Time”',
      times: '13:30–16:30',
      desc: isKo
        ? 'APAP8 참여 작가 김덕한과 함께 옻칠의 특성과 매력을 알아보고, 시간의 층을 담은 나만의 원목 코스터를 제작하는 창작 워크숍'
        : 'Join APAP8 participating artist Kim Deok han to explore the characteristics and appeal of traditional lacquer techniques and create a wooden coaster that captures the layers of time.',
    },
  ];
}
