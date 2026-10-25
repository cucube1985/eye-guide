export default [
  {
    id: 'conjunctivitis', category: 'anterior', title: '결막염', english: 'Conjunctivitis',
    summary: '눈 표면의 결막에 염증이 생겨 충혈, 눈곱, 가려움이 나타나는 질환입니다.',
    keyMessage: '원인에 따라 치료와 전염 여부가 다릅니다. 통증이나 시력저하가 있으면 단순 결막염으로 넘기지 마세요.',
    symptoms: ['눈의 충혈', '눈곱·눈물', '가려움·이물감', '눈꺼풀이 달라붙음'],
    sections: [
      {title: '왜 생기나요?', paragraphs: ['결막은 흰자와 눈꺼풀 안쪽을 덮는 얇은 막입니다. 바이러스, 세균, 알레르기 등이 염증을 일으킵니다. 증상만으로 원인을 정확히 구분하기 어려워 진찰이 필요할 수 있습니다.'], bullets: ['바이러스·세균성 결막염은 다른 사람에게 옮을 수 있습니다.', '알레르기성 결막염은 가려움이 흔하며 전염되지 않습니다.']},
      {title: '어떻게 치료하나요?', paragraphs: ['원인에 맞추어 치료합니다. 바이러스성 결막염은 대개 시간이 지나며 호전되고, 항생제는 바이러스나 알레르기에는 효과가 없습니다. 세균성으로 판단하면 항생제를 처방할 수 있습니다.', '깨끗한 차가운 수건을 잠시 올리거나 인공눈물을 쓰면 불편감 완화에 도움이 됩니다. 스테로이드 안약이나 남은 처방약은 임의로 사용하지 마세요.']},
      {title: '얼마나 걸리나요?', paragraphs: ['대부분 수일에서 수주에 걸쳐 좋아집니다. 바이러스성은 2~3주 이상 지속되기도 합니다. 증상이 심해지거나 일주일 정도 지나도 호전이 없으면 다시 진료받으세요. 콘택트렌즈 착용자의 충혈은 각막 감염 가능성 때문에 빠른 안과 평가가 필요합니다.']}
    ],
    care: ['손을 자주 씻고 눈을 비비지 마세요.', '수건·베개·안약을 다른 사람과 함께 쓰지 마세요.', '눈곱은 깨끗한 물과 눈마다 다른 깨끗한 솜으로 부드럽게 닦으세요.', '렌즈 착용을 중단하고, 회복 후 재착용 시점은 진료 시 확인하세요.'],
    urgent: {title: '통증·눈부심·시력저하는 당일 진료', text: '심한 통증, 빛을 보기 힘든 눈부심, 눈곱을 닦아도 남는 시야 흐림, 심한 충혈은 당일 안과에서 확인하세요. 신생아의 충혈과 눈곱도 즉시 진료가 필요합니다.'},
    faq: [
      {q: '눈만 마주쳐도 옮나요?', a: '주로 분비물이 묻은 손이나 물건을 통해 전파됩니다. 손 씻기와 개인 물품 구분이 중요합니다.'},
      {q: '항생제 안약을 꼭 써야 하나요?', a: '모든 결막염에 필요한 것은 아닙니다. 진찰로 원인과 정도를 판단한 뒤 처방에 따라 사용하세요.'}
    ],
    sources: [
      {label: 'NHS · Conjunctivitis', url: 'https://www.nhs.uk/conditions/conjunctivitis/'},
      {label: 'CDC · How to Treat Pink Eye', url: 'https://www.cdc.gov/conjunctivitis/treatment/index.html'},
      {label: 'CDC · Clinical Overview of Pink Eye', url: 'https://www.cdc.gov/conjunctivitis/hcp/clinical-overview/'}
    ]
  },
  {
    id: 'stye', category: 'anterior', title: '다래끼', english: 'Stye / Hordeolum',
    summary: '눈꺼풀의 속눈썹 뿌리나 분비샘에 염증이 생겨 붓고 아픈 멍울이 생깁니다.',
    keyMessage: '따뜻한 찜질과 청결 관리가 도움이 됩니다. 직접 짜거나 바늘로 터뜨리지 마세요.',
    symptoms: ['눈꺼풀의 아픈 멍울', '국소적인 붓기·붉어짐', '누르면 아픔', '눈물·이물감'],
    sections: [
      {title: '다래끼와 콩다래끼는 어떻게 다른가요?', paragraphs: ['다래끼는 속눈썹 뿌리나 눈꺼풀 분비샘의 감염과 관련이 있어 대개 붉고 아픕니다. 콩다래끼는 기름샘이 막혀 생기는 멍울로, 오래 남아도 통증은 적을 수 있습니다. 둘은 겉모습이 비슷해 진찰로 구분합니다.']},
      {title: '온찜질은 이렇게 하세요', paragraphs: ['깨끗한 수건을 따뜻한 물에 적셔 물기를 짠 뒤 눈을 감고 5~10분 정도 올려두세요. 하루 2~4회 반복할 수 있습니다. 손등으로 먼저 확인하여 뜨겁거나 따갑지 않은 온도를 사용하고, 눈을 세게 누르지 마세요.'], bullets: ['찜질 전후에 손을 씻으세요.', '고름을 직접 짜거나 속눈썹을 뽑지 마세요.']},
      {title: '병원 치료가 필요한 경우', paragraphs: ['많은 경우 자연스럽게 가라앉지만, 호전이 없거나 오래 남는 멍울은 진료가 필요합니다. 상태에 따라 안연고, 먹는 약 또는 배농·절개 치료를 선택합니다. 모든 다래끼에 항생제가 필요한 것은 아닙니다.', '같은 자리에 반복되거나 속눈썹이 빠지는 멍울은 다른 원인이 없는지 확인해야 합니다.']}
    ],
    care: ['눈을 만지기 전 손을 씻고, 눈꺼풀을 부드럽게 청결하게 관리하세요.', '회복할 때까지 콘택트렌즈와 눈 화장을 쉬세요.', '수건과 눈 화장 도구를 함께 쓰지 마세요.', '수주 동안 낫지 않거나 반복되면 안과 진료를 받으세요.'],
    urgent: {title: '붓기가 퍼지거나 시력이 변하면 당일 진료', text: '눈꺼풀 전체로 붉은 붓기가 빠르게 퍼지거나 열이 나면 당일 진료받으세요. 눈을 움직일 때 아프거나 시력이 떨어지면 즉시 안과 또는 응급실에서 확인해야 합니다.'},
    faq: [
      {q: '고름이 보이면 짜도 되나요?', a: '짜면 감염이 주변으로 퍼질 수 있습니다. 자연스럽게 배출되도록 관리하고, 필요하면 의료진이 처치합니다.'},
      {q: '아프지 않은 멍울이 남았어요.', a: '콩다래끼일 수 있습니다. 수주 이상 남거나 커지고 반복되면 진찰로 확인하세요.'}
    ],
    sources: [
      {label: 'NHS · Stye', url: 'https://www.nhs.uk/conditions/stye/'},
      {label: 'Moorfields · Stye patient guide', url: 'https://www.moorfields.nhs.uk/ae/patient-guides/stye'},
      {label: 'Moorfields · Chalazion', url: 'https://www.moorfields.nhs.uk/for-health-professionals/common-eye-condition-management/chalazion'}
    ]
  },
  {
    id: 'subconjunctival-hemorrhage', category: 'anterior', title: '결막하 출혈', english: 'Subconjunctival Hemorrhage',
    summary: '눈 표면의 작은 혈관에서 나온 피가 결막 아래에 고여 흰자가 붉게 보입니다.',
    keyMessage: '겉으로 선명하게 보여도, 통증과 시력저하가 없는 단순 결막하 출혈은 대개 저절로 흡수됩니다.',
    symptoms: ['흰자에 선명한 붉은 반점', '대개 통증 없음', '대개 시력 변화 없음', '가벼운 이물감'],
    sections: [
      {title: '왜 갑자기 생겼나요?', paragraphs: ['특별한 원인 없이 생기기도 하고 기침, 재채기, 힘주기, 눈 비비기 뒤에 생길 수 있습니다. 고혈압이나 피가 잘 멎지 않게 하는 약이 관련되기도 합니다. 눈을 다친 뒤 생겼다면 단순 출혈인지 다른 손상이 있는지 확인해야 합니다.']},
      {title: '어떻게 좋아지나요?', paragraphs: ['대부분 별도 치료 없이 1~3주에 걸쳐 옅어집니다. 출혈량에 따라 더 오래 걸릴 수 있고, 흡수되는 동안 붉은 범위가 퍼져 보이거나 노랗게 변할 수 있습니다. 불편하면 인공눈물이 도움이 되지만 피를 즉시 없애는 치료는 아닙니다.']},
      {title: '검사가 필요한 경우', paragraphs: ['반복되거나 다른 부위에도 멍·코피·잇몸 출혈이 있으면 혈압, 복용약, 출혈 경향을 확인합니다. 항응고제나 항혈소판제를 복용 중이라면 약 이름을 알려주세요. 눈이 빨갛다는 이유만으로 약을 임의로 끊지 말고 처방 의료진과 상의하세요.']}
    ],
    care: ['눈을 비비거나 세게 누르지 마세요.', '최근 혈압을 확인하지 않았다면 측정을 받아보세요.', '복용 중인 약과 출혈이 시작된 상황을 진료 시 알려주세요.', '수주가 지나도 옅어지지 않거나 반복되면 다시 진료받으세요.'],
    urgent: {title: '외상·통증·시력저하가 있으면 바로 확인', text: '눈을 다친 뒤 생긴 출혈, 통증, 시력저하, 심한 눈부심이 있으면 당일 안과 진료를 받으세요. 강한 충격이나 눈을 찔린 손상이 의심되면 즉시 응급실로 가세요.'},
    faq: [
      {q: '다른 사람에게 옮거나 눈 안쪽으로 번지나요?', a: '단순 결막하 출혈 자체는 전염되지 않습니다. 눈 표면 아래 고인 피가 흡수되는 과정이며, 새 통증이나 시력 변화가 생기면 다른 문제를 확인해야 합니다.'},
      {q: '아스피린이나 항응고제를 끊어야 하나요?', a: '임의로 중단하지 마세요. 반복되는 출혈이나 다른 부위 출혈이 있으면 처방 의료진이 필요에 따라 평가하고 조정합니다.'}
    ],
    sources: [
      {label: 'Moorfields · Subconjunctival haemorrhage', url: 'https://www.moorfields.nhs.uk/ae/patient-guides/subconjunctival-haemorrhage'},
      {label: 'AAO · What Is a Subconjunctival Hemorrhage?', url: 'https://www.aao.org/eye-health/diseases/what-is-subconjunctival-hemorrhage'},
      {label: 'Gloucestershire Hospitals NHS · Subconjunctival haemorrhage', url: 'https://www.gloshospitals.nhs.uk/your-visit/patient-information-leaflets/subconjunctival-haemorrhage/'}
    ]
  },
  {
    id: 'tearing', category: 'anterior', title: '눈물 흐름', english: 'Tearing / Epiphora',
    summary: '눈물이 많이 만들어지거나 배출이 원활하지 않아 눈 밖으로 넘치는 증상입니다.',
    keyMessage: '눈물이 흐른다고 항상 눈물길이 막힌 것은 아닙니다. 건조한 눈에서도 자극 때문에 눈물이 넘칠 수 있습니다.',
    symptoms: ['눈 밖으로 흐르는 눈물', '바람·추위에서 심해짐', '따가움·이물감', '한쪽 또는 양쪽의 지속적 눈물'],
    sections: [
      {title: '눈물은 왜 넘치나요?', paragraphs: ['눈물은 눈 표면을 적신 뒤 눈꺼풀 안쪽의 작은 구멍을 통해 코 쪽으로 빠져나갑니다. 표면 자극으로 눈물이 많아지거나, 눈꺼풀·눈물길 문제로 잘 빠져나가지 않으면 넘칩니다.'], bullets: ['만들어지는 양 증가: 건조증, 알레르기, 결막염, 속눈썹·이물 자극.', '배출 문제: 눈물길 좁아짐·막힘, 눈꺼풀 위치나 기능 이상.']},
      {title: '어떤 검사를 하나요?', paragraphs: ['언제, 어느 쪽에서 심한지 듣고 눈 표면, 눈꺼풀 위치와 눈물 배출구를 살핍니다. 건조증이 의심되면 눈물의 양과 안정성 등을 평가합니다. 필요에 따라 눈물길 검사로 배출 상태를 확인합니다. 증상만으로 눈물길 폐쇄를 단정할 수 없습니다.']},
      {title: '원인에 따라 치료가 달라요', paragraphs: ['눈 표면이 건조하거나 자극받는 경우에는 인공눈물과 환경 조절 등이 도움이 됩니다. 알레르기·염증은 원인에 맞추어 치료합니다. 눈꺼풀 이상이나 눈물길 폐쇄가 확인되면 상태에 따라 시술·수술을 상담할 수 있습니다.']}
    ],
    care: ['눈물은 깨끗한 티슈로 가볍게 눌러 닦고 눈을 비비지 마세요.', '바람·담배 연기·에어컨 바람이 눈에 직접 닿는 것을 피하세요.', '화면을 오래 볼 때 중간중간 쉬고 눈을 충분히 깜박이세요.', '한쪽에서 계속 흐르거나 일상생활에 지장이 있으면 진료받으세요.'],
    urgent: {title: '통증·시력 변화·눈 안쪽 붓기는 빠른 진료', text: '심한 눈 통증이나 시력저하가 동반되면 당일 안과 진료가 필요합니다. 코 옆 눈 안쪽이 붉고 아프게 붓거나 고름·발열이 있으면 감염 가능성이 있어 빠르게 진료받으세요.'},
    faq: [
      {q: '눈물이 많은데 왜 건조증 치료를 하나요?', a: '눈 표면이 마르면 자극에 대한 반응으로 눈물이 한꺼번에 나올 수 있습니다. 눈물막을 안정시키면 이런 반사 눈물이 줄 수 있습니다.'},
      {q: '눈물길 수술이 꼭 필요한가요?', a: '원인이 눈 표면인지, 눈꺼풀인지, 눈물길인지 먼저 구분합니다. 수술 여부는 검사 결과와 불편 정도를 보고 결정합니다.'}
    ],
    sources: [
      {label: 'NHS · Watering eyes', url: 'https://www.nhs.uk/symptoms/watering-eyes/'},
      {label: 'NEI · Dry Eye', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye'},
      {label: 'Norfolk and Norwich NHS · Watery Eyes (Epiphora)', url: 'https://www.nnuh.nhs.uk/publication/download/watery-eyes-epiphora-v2/'}
    ]
  },
  {
    id: 'cataract', category: 'cataract', title: '백내장', english: 'Cataract',
    summary: '눈 속의 투명한 수정체가 혼탁해져 시야가 흐리고 빛이 번지는 질환입니다.',
    keyMessage: '백내장은 혼탁해진 수정체의 문제입니다. 수술은 일상생활의 불편, 눈 상태, 기대 효과를 함께 보고 결정합니다.',
    symptoms: ['서서히 흐려지는 시야', '눈부심·빛 번짐', '야간 운전의 어려움', '색이 바래거나 겹쳐 보임'],
    sections: [
      {title: '어떤 질환인가요?', paragraphs: ['수정체는 카메라 렌즈처럼 빛의 초점을 맞춥니다. 나이가 들면서 흔히 혼탁해지며 외상, 일부 약물, 다른 눈 질환과 관련되어 생기기도 합니다. 시력이 흐린 원인이 모두 백내장은 아니므로 망막과 시신경도 함께 확인합니다.']},
      {title: '언제 수술하나요?', paragraphs: ['안경 조정과 조명 개선으로 지낼 수 있는 초기에는 경과를 볼 수 있습니다. 독서, 운전, 업무 등 생활에 불편이 생기면 수술의 이득과 위험을 상담합니다. 혼탁이 다른 눈 질환의 검사·치료를 방해하는 경우에도 수술을 고려합니다.', '수술은 혼탁한 수정체를 제거하고 인공수정체로 바꾸는 치료입니다. 안약이나 영양제가 이미 생긴 혼탁을 없애는 효과는 확립되어 있지 않습니다.']},
      {title: '인공수정체는 어떻게 고르나요?', paragraphs: ['단초점 렌즈는 주로 한 거리에 초점을 맞추어 다른 거리에는 안경이 필요할 수 있습니다. 다초점·초점심도확장 렌즈는 안경 의존도를 줄일 수 있지만 빛 번짐이나 어두운 곳에서의 불편 등 장단점이 있습니다. 난시, 망막·녹내장 상태와 생활 습관을 고려해 선택합니다.']},
      {title: '수술 후 얼마나 잘 보이나요?', paragraphs: ['백내장 때문에 흐려진 부분은 좋아질 수 있지만 망막·시신경 손상까지 회복시키는 수술은 아닙니다. 수술 후에도 안경이 필요할 수 있고 감염, 염증, 안압 변화, 망막박리 등의 합병증이 발생할 수 있습니다. 추후 수정체 뒤의 막이 흐려지는 후낭혼탁은 필요하면 레이저로 치료합니다.']}
    ],
    care: ['생활에서 불편한 거리와 활동을 적어 진료 때 알려주세요.', '복용약과 과거 눈 수술·질환을 의료진에게 알려주세요.', '수술 후 안약, 활동 제한, 검진 일정은 병원의 개별 지시를 따르세요.', '수술 당일 귀가는 보호자 등 동행을 준비하고 직접 운전하지 마세요.'],
    urgent: {title: '갑작스러운 변화는 백내장 탓으로 넘기지 마세요', text: '갑자기 잘 안 보이거나 심한 통증이 생기면 당일 진료받으세요. 특히 수술 후 시력저하, 심한 충혈·통증, 번쩍임·비문증 증가·커튼 같은 가림이 생기면 즉시 수술 병원이나 응급 안과로 연락하세요.'},
    faq: [
      {q: '백내장이 많이 익을 때까지 기다려야 하나요?', a: '반드시 그럴 필요는 없습니다. 혼탁의 정도뿐 아니라 일상생활의 불편, 다른 눈 질환과 수술 위험을 함께 평가합니다.'},
      {q: '수술하면 안경을 안 써도 되나요?', a: '모든 거리에서 안경 없이 보이는 것을 보장할 수 없습니다. 렌즈 종류와 목표 도수, 난시, 다른 눈 질환에 따라 달라집니다.'}
    ],
    sources: [
      {label: 'NEI · Cataracts', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/cataracts'},
      {label: 'NEI · Cataract Surgery', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/cataracts/cataract-surgery'},
      {label: 'AAO · Choosing an IOL for Cataract Surgery', url: 'https://aao.org/eye-health/tips-prevention/best-artificial-lens-implant-iol-cataract-surgery'}
    ]
  }
];
