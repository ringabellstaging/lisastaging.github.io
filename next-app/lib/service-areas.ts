import { translator, type Locale } from "./i18n";

type Copy = readonly [string, string, string];
export const areaText = (locale: Locale, copy: Copy) =>
  translator(locale)(...copy);

// Project IDs are selected from the published portfolio. A coverage area does
// not imply that we have a public case study or an office in every town.
export const serviceAreas = [
  {
    id: "toronto",
    name: ["Toronto", "多伦多", "多倫多"] as Copy,
    cities: [
      "Toronto",
      "North York",
      "Scarborough",
      "York",
      "Etobicoke",
      "East York",
    ],
    description: [
      "Explore our work in Toronto, North York and Scarborough. For condos, tell us about elevator reservations and building access when we discuss the staging plan; for houses, we review the rooms and furniture together.",
      "浏览我们在多伦多、北约克及士嘉堡的案例。公寓项目可在沟通方案时告知电梯预约及大楼出入要求；独立屋等住宅则由设计师与您共同确认房间及家具需求。",
      "瀏覽我們在多倫多、北約克及士嘉堡的案例。公寓項目可在溝通方案時告知電梯預約及大樓出入要求；獨立屋等住宅則由設計師與您共同確認房間及傢俱需求。",
    ] as Copy,
    projects: ["house38", "house64", "house73"],
  },
  {
    id: "york-region",
    name: ["York Region", "约克区", "約克區"] as Copy,
    cities: [
      "Stouffville",
      "Markham",
      "Unionville",
      "Richmond Hill",
      "Vaughan",
      "Thornhill",
      "Woodbridge",
      "Maple",
      "Aurora",
      "Newmarket",
      "East Gwillimbury",
      "Georgina",
      "King",
    ],
    description: [
      "Our team is based in Stouffville. The portfolio includes homes in Markham, Unionville, Richmond Hill, Vaughan and other York Region communities. Browse furniture arrangements and room styling from these local projects before discussing your own space with us.",
      "我们的团队位于史托维尔，案例涵盖万锦、于人村、列治文山、旺市及约克区其他社区。您可以先浏览这些当地案例的家具布局与软装细节，再与我们讨论您的房屋。",
      "我們的團隊位於史托維爾，案例涵蓋萬錦、於人村、列治文山、旺市及約克區其他社區。您可以先瀏覽這些當地案例的傢俱布局與軟裝細節，再與我們討論您的房屋。",
    ] as Copy,
    projects: ["house70", "house62", "house60"],
  },
  {
    id: "peel-region",
    name: ["Peel Region", "皮尔区", "皮爾區"] as Copy,
    cities: ["Mississauga", "Brampton", "Caledon"],
    description: [
      "Our Mississauga projects show different approaches to living areas, seating and finishing details. For a property in Mississauga, Brampton or Caledon, share the address and your intended listing date so we can confirm the scope and availability.",
      "我们的密西沙加案例展示了起居空间、座椅及软装细节的不同搭配。密西沙加、宾顿及卡利登的房屋可提供地址与计划挂牌日期，方便我们确认布置范围及档期。",
      "我們的密西沙加案例展示了起居空間、座椅及軟裝細節的不同搭配。密西沙加、賓頓及卡利登的房屋可提供地址與計劃掛牌日期，方便我們確認佈置範圍及檔期。",
    ] as Copy,
    projects: ["house68", "house46", "house40"],
  },
  {
    id: "durham-region",
    name: ["Durham Region", "杜兰区", "杜蘭區"] as Copy,
    cities: [
      "Pickering",
      "Ajax",
      "Whitby",
      "Oshawa",
      "Clarington",
      "Uxbridge",
      "Scugog",
      "Brock",
    ],
    description: [
      "See completed staging projects in Pickering, Whitby and Oshawa. Planning a listing elsewhere in Durham? Send your address and let us know whether the property is empty, partly furnished or still occupied so we can discuss a suitable approach.",
      "浏览我们在皮克林、惠特比及奥沙瓦完成的布置案例。如果房屋位于杜兰区其他城镇，请提供地址，并告知是空房、部分家具还是仍有人居住，方便讨论合适的方案。",
      "瀏覽我們在皮克林、惠特比及奧沙瓦完成的佈置案例。如果房屋位於杜蘭區其他城鎮，請提供地址，並告知是空房、部分傢俱還是仍有人居住，方便討論合適的方案。",
    ] as Copy,
    projects: ["house45", "house5", "house47"],
  },
  {
    id: "halton-region",
    name: ["Halton Region", "荷顿区", "荷頓區"] as Copy,
    cities: ["Oakville", "Burlington", "Milton", "Halton Hills"],
    description: [
      "For Oakville, Burlington, Milton and Halton Hills, contact us with your property address to confirm travel, scheduling and the staging scope. You can explore our wider GTA portfolio while we review your inquiry.",
      "如房屋位于奥克维尔、伯灵顿、米尔顿或荷顿山，请提供地址，以便确认交通、档期及布置范围。在我们查看询价时，您可以浏览其他大多地区案例。",
      "如房屋位於奧克維爾、伯靈頓、米爾頓或荷頓山，請提供地址，以便確認交通、檔期及佈置範圍。在我們查看詢價時，您可以瀏覽其他大多地區案例。",
    ] as Copy,
    projects: [],
  },
];

export const gtaPath = "/home-staging-gta";
export function serviceAreaForCity(city: string) {
  return serviceAreas.find((area) => area.cities.includes(city));
}
