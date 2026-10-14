// Shared option values keep the form, validation and team email in sync.
export const inquiryPropertyFields = {
  propertyType: {
    label: ["Property type", "房屋类型", "房屋類型"],
    options: {
      condo: ["Condo / apartment", "公寓", "公寓"],
      townhouse: ["Townhouse", "联排住宅", "聯排住宅"],
      "semi-detached": ["Semi-detached", "半独立屋", "半獨立屋"],
      detached: ["Detached house", "独立屋", "獨立屋"],
      other: ["Other", "其他", "其他"],
    },
  },
  occupancy: {
    label: ["Current condition", "房屋现状", "房屋現況"],
    options: {
      vacant: ["Empty / unfurnished", "空房、无家具", "空屋、無家具"],
      "partly-furnished": [
        "Vacant with some furniture",
        "无人居住、有部分家具",
        "無人居住、有部分家具",
      ],
      occupied: ["Currently lived in", "目前有人居住", "目前有人居住"],
    },
  },
  floorArea: {
    label: [
      "Approx. size (sq ft)",
      "大约面积（平方英尺）",
      "大約面積（平方英尺）",
    ],
    options: {
      "under-700": ["Under 700", "700 以下", "700 以下"],
      "700-999": ["700–999", "700–999", "700–999"],
      "1000-1499": ["1,000–1,499", "1,000–1,499", "1,000–1,499"],
      "1500-1999": ["1,500–1,999", "1,500–1,999", "1,500–1,999"],
      "2000-2999": ["2,000–2,999", "2,000–2,999", "2,000–2,999"],
      "3000-3999": ["3,000–3,999", "3,000–3,999", "3,000–3,999"],
      "4000-plus": ["4,000+", "4,000 以上", "4,000 以上"],
    },
  },
} as const;

export type InquiryPropertyField = keyof typeof inquiryPropertyFields;
export type InquiryPropertyDetails = Partial<
  Record<InquiryPropertyField, string>
>;

export function propertyEmailLines(data: InquiryPropertyDetails) {
  return Object.entries(inquiryPropertyFields).flatMap(
    ([field, definition]) => {
      const value = data[field as InquiryPropertyField];
      if (!value || !Object.hasOwn(definition.options, value)) return [];
      const labels = definition.options as Record<
        string,
        readonly [string, string, string]
      >;
      return [
        `${definition.label[0]}: ${labels[value][0]}${field === "floorArea" ? " sq ft (excluding balcony and basement)" : ""}`,
      ];
    },
  );
}
