<#--API描述 key：api_apitype -->
<#assign apiIntroduce={"3_12":"提供足球、籃球等最完整、最準確、最即時的的體育賽事資訊。","3_4":"每月提供超過10，000場各類賽事，是亞洲最大的體育平臺供應商之一。",
"3_10":"提供包含足球、棒球、籃球及橄欖球等世界主要體育專案。","3_19":"多元化滾球玩法，快速投注完美結合，亞洲最受歡迎的線上體育專家。",
"4_10":"六合彩、時時彩、快樂彩等彩種最全的平臺。","4_2":"北京、加拿大、澳洲等快樂彩玩法多樣，驚喜連連。法模式，玩法賠率業界最高。",
"4_11":"全網最好的時時彩平臺，全新1950獎金模式，支援玩家自主調整返水。","4_19":"多元化滾球玩法，快速投注完美結合，亞洲最受歡迎的線上體育專家。",
"3_21":"新興體育投注專家，最高水位，最快結算","4_22":"龍頭彩票六合彩，時時彩，PK10主流遊戲完美體驗","3_23":"行業內領先的體育投注賠率，最佳賠付",
"1_24":"歐洲最受歡迎的真人視訊遊戲"}>
<#assign apiIntroduceKey = apiIntroduce?keys>

<#--不要用这个，以后会删除-->
<#assign apiDesc={"1-1":"專業的遊戲研發，提供最佳品質","2-4":"KG快樂彩，包含六合彩，快樂彩，PK10等主彩票","3-1":"歐洲最受歡迎的真人視訊遊戲",
"3-2":"歐美最流行的遊戲平臺，3D視訊老虎機的頂尖開放商","4-3":"每月提供上萬場各類賽事，亞洲最大的體育平臺之一","5-1":"PC端，手機端投注同步，領跑4G時代",
"6-2":"全球最佳PT平臺，每週至少有兩個30A獎池大獎","7-1":"亞洲最受歡迎的真人視訊超真實意境","8-1":"現場投注與網路視訊投注完美結合",
"9-1":"AV女優真人娛樂場，多元化玩法","9-2":"亞洲極具人氣的遊戲平臺，超一流視聽效果","10-3":"足球,棒球,籃球及橄欖球等世界主要體育投注專家",
"10-2":"BB電子游藝,全球首款覆蓋所有手機平臺老虎機遊戲","10-4":"BBIN彩票最齊全的彩票平臺，提供六合彩、時時彩等","10-1":"亞洲最大最先進的真人娛樂場",
"11-4":"全新改版，全新感受，最專業的極致彩票平臺","12-3":"提供足球、籃球等最完整、最即時的體育賽事投注","13":"","14-2":"全球數百家家運營商的明智選擇，豐富遊戲種類",
"15-2":"歐洲領先地位的電子游藝提供商，深受玩家喜愛","17-1":"沙龍真人視訊，體驗奇特的東方神韻","16-1":"最佳人氣的真人視訊移動端同步投注",
"19-3":"多元化滾球玩法，快速投注完美結合，亞洲最受歡迎的線上體育專家。","20-2":"最受歡迎的，歐洲電子游藝提供商，3D老虎機","21-3":"新興體育投注專家，最高水位，最快結算",
"23-3":"行業內領先的體育投注賠率，最佳賠付","24-1":"歐洲最受歡迎的真人視訊遊戲","25-2":"亞洲網上游戲開發業界中的先驅之一"}>

<#--與apiDesc相比,電子類的描述縮短了-->
<#assign apiShortDesc={"1-1":"專業的遊戲研發，提供最佳品質","2-4":"KG快樂彩，包含六合彩，快樂彩，PK10等主彩票","3-1":"歐洲最受歡迎的真人視訊遊戲",
"3-2":"歐美最流行的老虎機遊戲平臺","4-3":"每月上萬場賽事，亞洲最大體育平臺","5-1":"PC端，手機端投注同步，領跑4G時代",
"6-2":"每週至少有兩個30A獎池大獎","7-1":"亞洲最受歡迎的真人視訊超真實意境","8-1":"現場投注與網路視訊投注完美結合",
"9-1":"AV女優真人娛樂場，多元化玩法","9-2":"亞洲極具人氣的領先遊戲平臺","10-3":"足球、籃球等最完整最即時賽事投注",
"10-2":"首款覆蓋所有手機平臺老虎機遊戲","10-4":"BBIN彩票最齊全的彩票平臺，提供六合彩、時時彩等","10-1":"亞洲最大最先進的真人娛樂場",
"11-4":"全新改版，全新感受，最專業的極致彩票平臺","12-3":"足球,籃球等世界主要體育投注專家","13":"","14-2":"百家家運營商的明智選擇，遊戲豐富",
"15-2":"歐洲領先地位的電子游藝提供商","17-1":"沙龍真人視訊，體驗奇特的東方神韻","16-1":"最佳人氣的真人視訊移動端同步投注","19-3":"多元化滾球，最受歡迎的線上體育",
"20-2":"最受歡迎的，歐洲電子游藝提供商，3D老虎機","21-3":"新興體育投注專家，最高水位，最快結算","22-4":"龍頭彩票六合彩，時時彩，PK10主流遊戲完美體驗",
"23-3":"行業內領先的體育投注賠率，最佳賠付","24-1":"歐洲最受歡迎的真人視訊遊戲","25-2":"亞洲網上游戲開發業界中的先驅之一","26-2":"全高清畫質行內領先，優質老虎機",
"28-2":"專注捕魚遊戲，掀起捕魚風潮","27-2":"獨特的動漫風格電子游藝平臺"}>
