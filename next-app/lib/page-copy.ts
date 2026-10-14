import type { Locale } from "./i18n";

// Editorial copy is translated on the server, before the page reaches the browser.
const chinese: Record<string, string> = {
  "Home staging for Toronto, Stouffville, Markham, Richmond Hill and the GTA. Explore Oaktime’s local projects and request a quote in English or Mandarin.":
    "为多伦多、史托维尔、万锦、列治文山及大多地区提供售前房屋布置。浏览 Oaktime 当地案例，通过英语或普通话联系设计师获取报价。",
  "Based in Stouffville, Oaktime Staging helps homeowners and real estate agents prepare properties for sale across Toronto and the Greater Toronto Area. We bring furniture, layout and finishing details together for listing photos and viewings.":
    "Oaktime Staging 位于史托维尔，为多伦多及大多地区的屋主和地产经纪提供售前房屋布置。我们通过家具、布局及软装细节，为房屋拍摄和看房做好准备。",
  "Home Staging in Toronto & the GTA": "多伦多及大多地区房屋布置",
  "Thoughtful home staging for memorable first impressions. Explore our projects across Toronto and the GTA and request a quote.":
    "用心布置每个空间，留下美好的第一印象。浏览我们在多伦多及大多地区的案例，联系设计师获取报价。",
  "HOME STAGING · TORONTO & THE GTA": "房屋布置 · 多伦多及大多地区",
  "Oaktime-staged living room with soft seating, natural light and a stone fireplace":
    "由 Oaktime 布置的客厅，搭配舒适座椅、自然采光与石材壁炉",
  "Thoughtful spaces.": "用心布置空间，",
  "Lasting impressions.": "留下美好印象。",
  "Helping buyers feel at home,": "让买家在入住之前，",
  "before they even move in.": "就感受到家的温度。",
  "Request a quote": "获取报价",
  "Explore our work": "浏览案例",
  "THE ARDMORE ROAD PROJECT": "ARDMORE ROAD 布置案例",
  "Considered design. Beautifully presented.": "用心设计，自然呈现。",
  "Based in Stouffville · Serving the GTA": "位于史托维尔 · 服务大多地区",
  "THE OAKTIME APPROACH": "OAKTIME 的设计理念",
  "Every home has a story.": "每个家，都有自己的故事。",
  "Let’s bring yours to life.": "让我们一起呈现它的美。",
  "We create spaces that feel warm, effortless and ready for their next chapter. Through thoughtful staging, we help your property make an impression that stays.":
    "我们用温暖、自然的空间布置，为房屋迎接新的篇章。通过家具、材质与细节的搭配，让您的房产给人留下难忘的第一印象。",
  "Home staging": "售前房屋布置",
  "Furniture, texture and finishing touches, brought together to help buyers see the possibilities in your home.":
    "通过家具、软装与细节搭配，让买家看到空间的潜力，想象未来在这里的生活。",
  "Property styling": "空间软装搭配",
  "A fresh perspective on your space. We work with its character to create a welcoming, considered first impression.":
    "从新的角度发现空间特色，用协调的软装和摆设，让房屋呈现温馨、得体的面貌。",
  "Design & logistics": "设计与布置执行",
  "From the furniture plan to placement, our team brings the details together so you can focus on your next chapter.":
    "从家具方案到现场摆放，由团队协调每一个细节，让您安心准备下一步。",
  "SELECTED WORK": "精选案例",
  "Spaces to": "让人心动的",
  "fall for.": "生活空间。",
  "View all projects": "浏览全部案例",
  "IN YOUR NEIGHBOURHOOD": "就在您身边",
  "A little closer": "走近身边的",
  "to home.": "美好空间。",
  "Explore our staging projects across the GTA and beyond. Find a space near you.":
    "在地图上浏览大多地区及周边的布置案例，寻找您附近的空间灵感。",
  "FROM FIRST HELLO TO FINAL TOUCH": "从初次沟通，到布置完成",
  "Beautifully simple.": "清晰流程，用心呈现。",
  "A personal approach, with thoughtful attention at every step.":
    "从您的需求出发，认真对待每一个环节。",
  "Tell us about your home": "告诉我们您的房屋情况",
  "Share your property address, budget and plans. We’ll get to know your space and what you need.":
    "提供房屋地址、预算及计划，让我们了解您的空间与布置需求。",
  "Make a plan together": "共同确定布置方案",
  "A designer reviews your inquiry and follows up to discuss the right approach and prepare a quote.":
    "设计师会查看您的需求，与您沟通适合的布置方式，并准备报价。",
  "Bring the space to life": "让空间焕然一新",
  "Once the plan is agreed, we coordinate the furniture, styling and finishing details.":
    "方案确认后，我们会协调家具、软装及现场细节，完成空间布置。",
  "Let’s start with your home": "从了解您的家开始",
  "A FEW THINGS TO KNOW": "常见问题",
  "Before we": "开始之前，",
  "begin.": "您可能想了解。",
  "Which areas do you serve?": "你们服务哪些地区？",
  "We are based in Stouffville and serve Toronto and the Greater Toronto Area. Share your property address and we’ll confirm availability for your location.":
    "我们位于史托维尔，服务多伦多及大多地区。请提供您的房屋地址，我们会确认是否可以安排服务。",
  "How much does home staging cost?": "房屋布置需要多少钱？",
  "Every property is different. Your quote depends on the space, the furnishings required and the scope of work. Send us your address and budget to start the conversation.":
    "每套房屋的需求都不同，报价取决于空间、所需家具及服务范围。请发送您的地址和预算，方便我们进一步沟通。",
  "What happens after I request a quote?": "提交询价后会发生什么？",
  "Your inquiry goes to our team. A designer will review your details and get in touch to discuss your needs and prepare a quote.":
    "您的询价会发送给我们的团队。设计师会查看您提供的信息，尽快与您联系，沟通需求并准备报价。",
  "Can I speak with the team in Chinese?": "可以用中文沟通吗？",
  "Yes. You can call our Mandarin line at 416-939-3962. For English, call (416) 877-1878.":
    "可以。中文服务请拨打 (416) 939-3962，英文服务请拨打 (416) 877-1878。",
  "Our Home Staging Projects": "房屋布置案例",
  "Browse Oaktime Staging projects across Toronto and the GTA. Explore our work by location and discover thoughtful furniture arrangements and styling.":
    "浏览 Oaktime Staging 在多伦多及大多地区的房屋布置案例，按地区查找作品，发现家具与软装搭配灵感。",
  "THE OAKTIME PORTFOLIO": "OAKTIME 案例作品",
  "Every space.": "每个空间，",
  "A new perspective.": "都有新的可能。",
  "A collection of homes, thoughtfully brought to life. Find inspiration for your next chapter.":
    "用心呈现每一套房屋，为您的下一个生活篇章寻找灵感。",
  "About Our Home Staging Team": "关于我们的房屋布置团队",
  "Meet Oaktime Staging, a Stouffville-based team bringing thoughtful property styling, furniture placement and staging to homes across Toronto and the GTA.":
    "认识 Oaktime Staging：位于史托维尔的房屋布置团队，为多伦多及大多地区提供软装搭配、家具摆放与售前布置服务。",
  "A bright open-plan home staged by the Oaktime team":
    "由 Oaktime 团队布置的明亮开放式居住空间",
  "THE PEOPLE BEHIND THE SPACES": "空间背后的团队",
  "A thoughtful eye.": "用心发现美，",
  "A personal touch.": "细节传递温度。",
  "At Oaktime Staging, we believe a well-presented home helps people imagine what comes next. We bring furniture, texture and thoughtful details together to make each space feel welcoming.":
    "在 Oaktime Staging，我们相信精心呈现的房屋，能让人想象未来的生活。我们将家具、材质与细节融为一体，让每个空间都温暖、亲切。",
  "Based in Stouffville, our team works with homeowners and real estate professionals across Toronto and the GTA. From the first conversation to furniture placement and the finishing touches, we take a considered approach to every home.":
    "团队位于史托维尔，为多伦多及大多地区的屋主和地产专业人士提供服务。从初次沟通到家具摆放和最后的细节，我们认真对待每一套房屋。",
  "Oaktime Staging is operated by Oak Time Inc. Our team can help you in English and Mandarin.":
    "Oaktime Staging 由 Oak Time Inc. 运营，提供中文及英文服务。",
  "Contact Us for a Home Staging Quote": "联系团队获取房屋布置报价",
  "GET IN TOUCH": "联系我们",
  "Let’s start a": "让我们开始",
  "conversation.": "一次沟通。",
  "Company address": "公司地址",
  "Please contact us to arrange a consultation.": "请提前联系我们，安排咨询。",
  "CONNECT ON WECHAT": "微信联系",
  "Scan to contact our Mandarin-speaking team on WeChat":
    "扫码通过微信联系中文服务团队",
  "Inquiry Privacy Notice": "询价信息隐私说明",
  "How Oaktime Staging uses the information you provide when requesting a home staging quote.":
    "了解 Oaktime Staging 如何使用您在询价时提供的个人信息。",
  "Your inquiry.": "您的询价，",
  "Your information.": "您的信息。",
  "When you request a quote, we collect your property address, email address and phone number, along with any property type, occupancy, approximate floor area, budget, name or notes you choose to share.":
    "当您提交询价时，我们会收集房屋地址、电子邮箱和电话号码，以及您自愿提供的房屋类型、居住状态、大约面积、预算、姓名和备注。",
  "How we use it": "信息用途",
  "We use these details to acknowledge your inquiry, review your staging needs, prepare a quote and contact you about your request. Submitting an inquiry does not automatically subscribe you to marketing emails.":
    "我们使用这些信息确认收到询价、了解布置需求、准备报价，并就您的请求与您联系。提交询价不会自动订阅营销邮件。",
  "How it is processed": "信息处理与保存",
  "Optional marketing emails": "可选推广邮件",
  "If you separately tick the optional mailing list box, Oaktime Staging (Oak Time Inc.) may email you occasional staging tips, project inspiration and offers. Leaving it unchecked does not affect your quote request. This permission covers email only, not text messages or phone promotions.":
    "如果您单独勾选可选的邮件订阅选项，Oaktime Staging（Oak Time Inc.）可以偶尔通过电子邮件向您发送布置建议、案例灵感和优惠。不勾选不会影响询价。此授权仅适用于电子邮件，不包括短信或电话推广。",
  "We record your choice, the time, language, source and wording of the consent request with your inquiry. The website record expires after 30 days. A copy is sent to our business mailbox, where we retain the consent evidence for as long as we rely on it to send marketing emails. To withdraw your consent at any time, email":
    "我们随询价记录保存您的选择、时间、语言、来源和当时展示的同意文案。网站记录在 30 天后到期；副本会发送至公司邮箱，在我们依据此同意发送推广邮件期间保留，作为授权凭证。如需随时撤回同意，请发邮件至",
  "We will stop marketing emails within 10 business days of your request.":
    "我们会在收到请求后的 10 个工作日内停止向您发送推广邮件。",
  "Our website hosting, secure inquiry storage and email delivery providers process this information to help us respond. The website’s inquiry record is retained for up to 30 days; correspondence sent to our business mailbox may be retained for follow-up. Please avoid including financial account details or other sensitive information in the notes.":
    "网站托管、询价存储和邮件服务提供商会处理相关信息，协助我们回复。网站中的询价记录最多保存 30 天；发送至公司邮箱的往来邮件可能会保留，以便后续跟进。请不要在备注中填写银行账户或其他敏感信息。",
  "Project locations and maps": "案例位置与地图",
  "Public project maps show approximate neighbourhood locations and street names, rather than full property addresses. When you view the map, your browser requests map tiles from OpenStreetMap, which receives normal connection information such as your IP address.":
    "公开案例地图仅展示大致位置和街道名称，不公开完整门牌地址。查看地图时，浏览器会从 OpenStreetMap 加载地图图片，该服务会接收 IP 地址等常规连接信息。",
  "Questions or requests": "咨询与信息请求",
  "To ask about your information or request a correction or deletion, contact":
    "如需了解、更正或删除您的信息，请联系",
  Home: "首页",
  "Our work": "案例作品",
  "HOME STAGING": "房屋布置",
  "Street name shown for reference. Full property address kept private.":
    "街道名称仅供参考，完整房屋地址不公开。",
  "Imagine the possibilities": "为您的家，",
  "for your home.": "发现更多可能。",
  "Let’s talk about the right approach for your space.":
    "一起聊聊适合您空间的布置方案。",
  "404 · PAGE NOT FOUND": "404 · 页面不存在",
  "A different": "换个方向，",
  "direction.": "发现更多作品。",
  "This project or page is no longer available. You can explore our current portfolio or get in touch about your home.":
    "这个案例或页面已不可用。您可以浏览现有作品，或联系我们讨论您的房屋需求。",
  "Explore our work ↗": "浏览案例 ↗",
};

const traditional: Record<string, string> = {
  "Home staging for Toronto, Stouffville, Markham, Richmond Hill and the GTA. Explore Oaktime’s local projects and request a quote in English or Mandarin.":
    "為多倫多、史托維爾、萬錦、列治文山及大多地區提供售前房屋佈置。瀏覽 Oaktime 當地案例，通過英語或普通話聯繫設計師獲取報價。",
  "Based in Stouffville, Oaktime Staging helps homeowners and real estate agents prepare properties for sale across Toronto and the Greater Toronto Area. We bring furniture, layout and finishing details together for listing photos and viewings.":
    "Oaktime Staging 位於史托維爾，為多倫多及大多地區的屋主和地產經紀提供售前房屋佈置。我們通過傢俱、布局及軟裝細節，為房屋拍攝和看房做好準備。",
  "Home Staging in Toronto & the GTA": "多倫多及大多地區房屋佈置",
  "Thoughtful home staging for memorable first impressions. Explore our projects across Toronto and the GTA and request a quote.":
    "用心佈置每個空間，留下美好的第一印象。瀏覽我們在多倫多及大多地區的案例，聯繫設計師獲取報價。",
  "HOME STAGING · TORONTO & THE GTA": "房屋佈置 · 多倫多及大多地區",
  "Oaktime-staged living room with soft seating, natural light and a stone fireplace":
    "由 Oaktime 佈置的客廳，搭配舒適座椅、自然採光與石材壁爐",
  "Thoughtful spaces.": "用心佈置空間，",
  "Lasting impressions.": "留下美好印象。",
  "Helping buyers feel at home,": "讓買家在入住之前，",
  "before they even move in.": "就感受到家的溫度。",
  "Request a quote": "獲取報價",
  "Explore our work": "瀏覽案例",
  "THE ARDMORE ROAD PROJECT": "ARDMORE ROAD 佈置案例",
  "Considered design. Beautifully presented.": "用心設計，自然呈現。",
  "Based in Stouffville · Serving the GTA": "位於史托維爾 · 服務大多地區",
  "THE OAKTIME APPROACH": "OAKTIME 的設計理念",
  "Every home has a story.": "每個家，都有自己的故事。",
  "Let’s bring yours to life.": "讓我們一起呈現它的美。",
  "We create spaces that feel warm, effortless and ready for their next chapter. Through thoughtful staging, we help your property make an impression that stays.":
    "我們用溫暖、自然的空間佈置，為房屋迎接新的篇章。通過傢俱、材質與細節的搭配，讓您的房產給人留下難忘的第一印象。",
  "Home staging": "售前房屋佈置",
  "Furniture, texture and finishing touches, brought together to help buyers see the possibilities in your home.":
    "通過傢俱、軟裝與細節搭配，讓買家看到空間的潛力，想像未來在這裡的生活。",
  "Property styling": "空間軟裝搭配",
  "A fresh perspective on your space. We work with its character to create a welcoming, considered first impression.":
    "從新的角度發現空間特色，用協調的軟裝和擺設，讓房屋呈現溫馨、得體的面貌。",
  "Design & logistics": "設計與佈置執行",
  "From the furniture plan to placement, our team brings the details together so you can focus on your next chapter.":
    "從傢俱方案到現場擺放，由團隊協調每一個細節，讓您安心準備下一步。",
  "SELECTED WORK": "精選案例",
  "Spaces to": "讓人心動的",
  "fall for.": "生活空間。",
  "View all projects": "瀏覽全部案例",
  "IN YOUR NEIGHBOURHOOD": "就在您身邊",
  "A little closer": "走近身邊的",
  "to home.": "美好空間。",
  "Explore our staging projects across the GTA and beyond. Find a space near you.":
    "在地圖上瀏覽大多地區及周邊的佈置案例，尋找您附近的空間靈感。",
  "FROM FIRST HELLO TO FINAL TOUCH": "從初次溝通，到佈置完成",
  "Beautifully simple.": "清晰流程，用心呈現。",
  "A personal approach, with thoughtful attention at every step.":
    "從您的需求出發，認真對待每一個環節。",
  "Tell us about your home": "告訴我們您的房屋情況",
  "Share your property address, budget and plans. We’ll get to know your space and what you need.":
    "提供房屋地址、預算及計劃，讓我們瞭解您的空間與佈置需求。",
  "Make a plan together": "共同確定佈置方案",
  "A designer reviews your inquiry and follows up to discuss the right approach and prepare a quote.":
    "設計師會查看您的需求，與您溝通適合的佈置方式，並準備報價。",
  "Bring the space to life": "讓空間煥然一新",
  "Once the plan is agreed, we coordinate the furniture, styling and finishing details.":
    "方案確認後，我們會協調傢俱、軟裝及現場細節，完成空間佈置。",
  "Let’s start with your home": "從瞭解您的家開始",
  "A FEW THINGS TO KNOW": "常見問題",
  "Before we": "開始之前，",
  "begin.": "您可能想了解。",
  "Which areas do you serve?": "你們服務哪些地區？",
  "We are based in Stouffville and serve Toronto and the Greater Toronto Area. Share your property address and we’ll confirm availability for your location.":
    "我們位於史托維爾，服務多倫多及大多地區。請提供您的房屋地址，我們會確認是否可以安排服務。",
  "How much does home staging cost?": "房屋佈置需要多少錢？",
  "Every property is different. Your quote depends on the space, the furnishings required and the scope of work. Send us your address and budget to start the conversation.":
    "每套房屋的需求都不同，報價取決於空間、所需傢俱及服務範圍。請發送您的地址和預算，方便我們進一步溝通。",
  "What happens after I request a quote?": "提交詢價後會發生什麼？",
  "Your inquiry goes to our team. A designer will review your details and get in touch to discuss your needs and prepare a quote.":
    "您的詢價會發送給我們的團隊。設計師會查看您提供的信息，儘快與您聯繫，溝通需求並準備報價。",
  "Can I speak with the team in Chinese?": "可以用中文溝通嗎？",
  "Yes. You can call our Mandarin line at 416-939-3962. For English, call (416) 877-1878.":
    "可以。中文服務請撥打 (416) 939-3962，英文服務請撥打 (416) 877-1878。",
  "Our Home Staging Projects": "房屋佈置案例",
  "Browse Oaktime Staging projects across Toronto and the GTA. Explore our work by location and discover thoughtful furniture arrangements and styling.":
    "瀏覽 Oaktime Staging 在多倫多及大多地區的房屋佈置案例，按地區查找作品，發現傢俱與軟裝搭配靈感。",
  "THE OAKTIME PORTFOLIO": "OAKTIME 案例作品",
  "Every space.": "每個空間，",
  "A new perspective.": "都有新的可能。",
  "A collection of homes, thoughtfully brought to life. Find inspiration for your next chapter.":
    "用心呈現每一套房屋，為您的下一個生活篇章尋找靈感。",
  "About Our Home Staging Team": "關於我們的房屋佈置團隊",
  "Meet Oaktime Staging, a Stouffville-based team bringing thoughtful property styling, furniture placement and staging to homes across Toronto and the GTA.":
    "認識 Oaktime Staging：位於史托維爾的房屋佈置團隊，為多倫多及大多地區提供軟裝搭配、傢俱擺放與售前佈置服務。",
  "A bright open-plan home staged by the Oaktime team":
    "由 Oaktime 團隊佈置的明亮開放式居住空間",
  "THE PEOPLE BEHIND THE SPACES": "空間背後的團隊",
  "A thoughtful eye.": "用心發現美，",
  "A personal touch.": "細節傳遞溫度。",
  "At Oaktime Staging, we believe a well-presented home helps people imagine what comes next. We bring furniture, texture and thoughtful details together to make each space feel welcoming.":
    "在 Oaktime Staging，我們相信精心呈現的房屋，能讓人想像未來的生活。我們將傢俱、材質與細節融為一體，讓每個空間都溫暖、親切。",
  "Based in Stouffville, our team works with homeowners and real estate professionals across Toronto and the GTA. From the first conversation to furniture placement and the finishing touches, we take a considered approach to every home.":
    "團隊位於史托維爾，為多倫多及大多地區的屋主和地產專業人士提供服務。從初次溝通到傢俱擺放和最後的細節，我們認真對待每一套房屋。",
  "Oaktime Staging is operated by Oak Time Inc. Our team can help you in English and Mandarin.":
    "Oaktime Staging 由 Oak Time Inc. 運營，提供中文及英文服務。",
  "Contact Us for a Home Staging Quote": "聯繫團隊獲取房屋佈置報價",
  "GET IN TOUCH": "聯繫我們",
  "Let’s start a": "讓我們開始",
  "conversation.": "一次溝通。",
  "Company address": "公司地址",
  "Please contact us to arrange a consultation.": "請提前聯繫我們，安排諮詢。",
  "CONNECT ON WECHAT": "微信聯繫",
  "Scan to contact our Mandarin-speaking team on WeChat":
    "掃碼通過微信聯繫中文服務團隊",
  "Inquiry Privacy Notice": "詢價信息隱私說明",
  "How Oaktime Staging uses the information you provide when requesting a home staging quote.":
    "瞭解 Oaktime Staging 如何使用您在詢價時提供的個人信息。",
  "Your inquiry.": "您的詢價，",
  "Your information.": "您的信息。",
  "When you request a quote, we collect your property address, email address and phone number, along with any property type, occupancy, approximate floor area, budget, name or notes you choose to share.":
    "當您提交詢價時，我們會收集房屋地址、電子郵箱和電話號碼，以及您自願提供的房屋類型、居住狀態、大約面積、預算、姓名和備註。",
  "How we use it": "信息用途",
  "We use these details to acknowledge your inquiry, review your staging needs, prepare a quote and contact you about your request. Submitting an inquiry does not automatically subscribe you to marketing emails.":
    "我們使用這些信息確認收到詢價、瞭解佈置需求、準備報價，並就您的請求與您聯繫。提交詢價不會自動訂閱營銷郵件。",
  "How it is processed": "信息處理與保存",
  "Optional marketing emails": "可選推廣郵件",
  "If you separately tick the optional mailing list box, Oaktime Staging (Oak Time Inc.) may email you occasional staging tips, project inspiration and offers. Leaving it unchecked does not affect your quote request. This permission covers email only, not text messages or phone promotions.":
    "如果您單獨勾選可選的郵件訂閱選項，Oaktime Staging（Oak Time Inc.）可以偶爾透過電子郵件向您發送佈置建議、案例靈感和優惠。不勾選不會影響詢價。此授權僅適用於電子郵件，不包括簡訊或電話推廣。",
  "We record your choice, the time, language, source and wording of the consent request with your inquiry. The website record expires after 30 days. A copy is sent to our business mailbox, where we retain the consent evidence for as long as we rely on it to send marketing emails. To withdraw your consent at any time, email":
    "我們隨詢價記錄保存您的選擇、時間、語言、來源和當時展示的同意文案。網站記錄在 30 天後到期；副本會發送至公司郵箱，在我們依據此同意發送推廣郵件期間保留，作為授權憑證。如需隨時撤回同意，請發郵件至",
  "We will stop marketing emails within 10 business days of your request.":
    "我們會在收到請求後的 10 個工作日內停止向您發送推廣郵件。",
  "Our website hosting, secure inquiry storage and email delivery providers process this information to help us respond. The website’s inquiry record is retained for up to 30 days; correspondence sent to our business mailbox may be retained for follow-up. Please avoid including financial account details or other sensitive information in the notes.":
    "網站託管、詢價存儲和郵件服務提供商會處理相關信息，協助我們回覆。網站中的詢價記錄最多保存 30 天；發送至公司郵箱的往來郵件可能會保留，以便後續跟進。請不要在備註中填寫銀行賬戶或其他敏感信息。",
  "Project locations and maps": "案例位置與地圖",
  "Public project maps show approximate neighbourhood locations and street names, rather than full property addresses. When you view the map, your browser requests map tiles from OpenStreetMap, which receives normal connection information such as your IP address.":
    "公開案例地圖僅展示大致位置和街道名稱，不公開完整門牌地址。查看地圖時，瀏覽器會從 OpenStreetMap 加載地圖圖片，該服務會接收 IP 地址等常規連接信息。",
  "Questions or requests": "諮詢與信息請求",
  "To ask about your information or request a correction or deletion, contact":
    "如需瞭解、更正或刪除您的信息，請聯繫",
  Home: "首頁",
  "Our work": "案例作品",
  "HOME STAGING": "房屋佈置",
  "Street name shown for reference. Full property address kept private.":
    "街道名稱僅供參考，完整房屋地址不公開。",
  "Imagine the possibilities": "為您的家，",
  "for your home.": "發現更多可能。",
  "Let’s talk about the right approach for your space.":
    "一起聊聊適合您空間的佈置方案。",
  "404 · PAGE NOT FOUND": "404 · 頁面不存在",
  "A different": "換個方向，",
  "direction.": "發現更多作品。",
  "This project or page is no longer available. You can explore our current portfolio or get in touch about your home.":
    "這個案例或頁面已不可用。您可以瀏覽現有作品，或聯繫我們討論您的房屋需求。",
  "Explore our work ↗": "瀏覽案例 ↗",
};

export function pageText(locale: Locale, text: string) {
  if (locale === "en") return text;
  return (locale === "zh-hant" ? traditional : chinese)[text] || text;
}

const projectDescriptions: Record<string, string> = {
  house38: "柔和的座椅与沉稳的壁炉相互呼应，呈现温暖、协调的客厅空间。",
  house36: "明亮的开放式空间，通过协调的家具与软装，将不同生活区域自然衔接。",
  house68: "浅色调、层次丰富的织物与精心摆放的座椅，让客厅显得开阔而亲切。",
  house35: "木质细节搭配柔和的软装，为空间带来沉静、温暖的氛围。",
  house60: "柔和的中性色与经典家具，呈现舒适、从容的居住空间。",
  house62: "围绕房屋原有的空间特点，通过家具和细节搭配，呈现自然的生活动线。",
};

const traditionalProjectDescriptions: Record<string, string> = {
  house38: "柔和的座椅與沉穩的壁爐相互呼應，呈現溫暖、協調的客廳空間。",
  house36: "明亮的開放式空間，通過協調的傢俱與軟裝，將不同生活區域自然銜接。",
  house68: "淺色調、層次豐富的織物與精心擺放的座椅，讓客廳顯得開闊而親切。",
  house35: "木質細節搭配柔和的軟裝，為空間帶來沉靜、溫暖的氛圍。",
  house60: "柔和的中性色與經典傢俱，呈現舒適、從容的居住空間。",
  house62: "圍繞房屋原有的空間特點，通過傢俱和細節搭配，呈現自然的生活動線。",
};

export function projectDescription(
  project: { id: string; description: string; street: string },
  locale: Locale,
) {
  return locale !== "en"
    ? (locale === "zh-hant"
        ? traditionalProjectDescriptions
        : projectDescriptions)[project.id] ||
        (locale === "zh-hant"
          ? `瀏覽 ${project.street} 的房屋布置案例，了解家具擺放、軟裝搭配與空間細節。`
          : `浏览 ${project.street} 的房屋布置案例，了解家具摆放、软装搭配与空间细节。`)
    : project.description;
}
