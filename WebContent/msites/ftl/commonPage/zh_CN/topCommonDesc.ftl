<#--API描述 key：api_apitype -->
<#assign apiIntroduce={"3_12":"提供足球、篮球等最完整、最准确、最即时的的体育赛事信息。","3_4":"每月提供超过10，000场各类赛事，是亚洲最大的体育平台供应商之一。",
"3_10":"提供包含足球、棒球、篮球及橄榄球等世界主要体育专案。","3_19":"多元化滚球玩法，快速投注完美结合，亚洲最受欢迎的线上体育专家。",
"4_10":"六合彩、时时彩、快乐彩等彩种最全的平台。","4_2":"北京、加拿大、澳洲等快乐彩玩法多样，惊喜连连。法模式，玩法赔率业界最高。",
"4_11":"全网最好的时时彩平台，全新1950奖金模式，支持玩家自主调整返水。","4_19":"多元化滚球玩法，快速投注完美结合，亚洲最受欢迎的线上体育专家。",
"3_21":"新兴体育投注专家，最高水位，最快结算","4_22":"龙头彩票六合彩，时时彩，PK10主流游戏完美体验","3_23":"行业内领先的体育投注赔率，最佳赔付","3_40":"业界公认的滚球专家",
"1_24":"欧洲最受欢迎的真人视讯游戏","3_36":"提供的足球、篮球、亚洲乐透、亚洲赛马、赛狗和世界各地的股票指数都应有尽有。"}>
<#assign apiIntroduceKey = apiIntroduce?keys>

<#assign apiDesc={"1-1":"专业的游戏研发，提供最佳品质","2-4":"KG快乐彩，包含六合彩，快乐彩，PK10等主彩票","3-1":"欧洲最受欢迎的真人视讯游戏",
"3-2":"欧美最流行的游戏平台，3D视频老虎机的顶尖开放商","4-3":"每月提供上万场各类赛事，亚洲最大的体育平台之一","5-1":"PC端，手机端投注同步，领跑4G时代",
"6-2":"全球最佳PT平台，每周至少有两个30A奖池大奖","7-1":"亚洲最受欢迎的真人视讯超真实意境","8-1":"现场投注与网络视讯投注完美结合",
"9-1":"AV女优真人娱乐场，多元化玩法","9-2":"亚洲极具人气的游戏平台，超一流视听效果","10-3":"足球,棒球,篮球及橄榄球等世界主要体育投注专家",
"10-2":"BB电子游艺,全球首款覆盖所有手机平台老虎机游戏","10-4":"BBIN彩票最齐全的彩票平台，提供六合彩、时时彩等","10-1":"亚洲最大最先进的真人娱乐场",
"11-4":"全新改版，全新感受，最专业的极致彩票平台","12-3":"提供足球、篮球等最完整、最即时的体育赛事投注","13":"","14-2":"全球数百家家运营商的明智选择，丰富游戏种类",
"15-2":"欧洲领先地位的电子游艺提供商，深受玩家喜爱","17-1":"沙龙真人视讯，体验奇特的东方神韵","16-1":"最佳人气的真人视讯移动端同步投注",
"19-3":"多元化滚球玩法，快速投注完美结合，亚洲最受欢迎的线上体育专家。","20-2":"最受欢迎的，欧洲电子游艺提供商，3D老虎机","21-3":"新兴体育投注专家，最高水位，最快结算",
"23-3":"行业内领先的体育投注赔率，最佳赔付","24-1":"欧洲最受欢迎的真人视讯游戏","25-2":"亚洲网上游戏开发业界中的先驱之一","31-2":"电子机率产品的主要供应商","32-2":"欧洲在线电子游戏开发供应商","35-2":"亚洲知名的游戏软件开发商"}>

<#--与apiDesc相比,电子类的描述缩短了-->
<#assign apiShortDesc={"1-1":"专业的游戏研发，提供最佳品质","2-4":"KG快乐彩，包含六合彩，快乐彩，PK10等主彩票","3-1":"欧洲最受欢迎的真人视讯游戏",
"3-2":"欧美最流行的老虎机游戏平台","4-3":"每月上万场赛事，亚洲最大体育平台","5-1":"PC端，手机端投注同步，领跑4G时代",
"6-2":"每周至少有两个30A奖池大奖","7-1":"亚洲最受欢迎的真人视讯超真实意境","8-1":"现场投注与网络视讯投注完美结合",
"9-1":"AV女优真人娱乐场，多元化玩法","9-2":"亚洲极具人气的领先游戏平台","10-3":"足球、篮球等最完整最即时赛事投注","37-3":"足球、篮球等最完整最即时赛事投注",
"10-2":"首款覆盖所有手机平台老虎机游戏","10-4":"BBIN彩票最齐全的彩票平台，提供六合彩、时时彩等","10-1":"亚洲最大最先进的真人娱乐场",
"11-4":"全新改版，全新感受，最专业的极致彩票平台","12-3":"足球,篮球等世界主要体育投注专家","13":"","14-2":"百家家运营商的明智选择，游戏丰富",
"15-2":"欧洲领先地位的电子游艺提供商","17-1":"沙龙真人视讯，体验奇特的东方神韵","16-1":"最佳人气的真人视讯移动端同步投注","19-3":"多元化滚球，最受欢迎的线上体育","40-3":"业界公认的滚球专家",
"20-2":"最受欢迎的欧洲电子提供商，3D老虎机","21-3":"新兴体育投注专家，最高水位，最快结算","22-4":"龙头彩票六合彩，时时彩，PK10主流游戏完美体验",
"23-3":"行业内领先的体育投注赔率，最佳赔付","24-1":"欧洲最受欢迎的真人视讯游戏","25-2":"亚洲网上游戏开发业界中的先驱之一","26-2":"全高清画质行内领先，优质老虎机",
"28-2":"专注捕鱼游戏，掀起捕鱼风潮","27-2":"独特的动漫风格电子游艺平台","31-2":"电子机率产品的主要供应商","32-2":"欧洲在线电子游戏开发供应商","35-2":"亚洲知名的游戏软件开发商","33-1":"全球公认最公平的经典游戏","36-3":"全球主要赛事 独创滚球过关, 超高赔率","35-2":"亚洲知名的游戏软件开发商"}>
