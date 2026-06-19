const contentMap = {
  siteName: "爱游戏",
  baseUrl: "https://mcn-i-game.com.cn",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["爱游戏", "热门推荐", "新游上架"],
      keywords: ["爱游戏平台", "精选游戏", "每日推荐"],
      content: "欢迎来到爱游戏，探索最精彩的游戏世界。"
    },
    {
      id: "games",
      title: "游戏库",
      tags: ["爱游戏", "游戏分类", "动作", "策略", "休闲"],
      keywords: ["爱游戏库", "单机游戏", "网络游戏", "手机游戏"],
      content: "收录海量游戏，满足不同玩家的需求。"
    },
    {
      id: "news",
      title: "游戏资讯",
      tags: ["爱游戏", "新闻", "更新公告", "活动"],
      keywords: ["游戏新闻", "版本更新", "福利活动"],
      content: "第一时间掌握爱游戏最新动态。"
    },
    {
      id: "community",
      title: "玩家社区",
      tags: ["爱游戏", "论坛", "攻略", "交流"],
      keywords: ["玩家互动", "游戏攻略", "心得分享"],
      content: "与千万玩家一起畅聊爱游戏。"
    }
  ],
  tags: [
    "爱游戏", "热门", "新游", "动作", "策略",
    "休闲", "RPG", "竞技", "模拟", "冒险"
  ]
};

function searchSections(query) {
  if (!query || query.trim() === "") return [];

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentMap.sections) {
    const titleLower = section.title.toLowerCase();
    const contentLower = section.content.toLowerCase();

    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const keywordMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    const titleMatch = titleLower.includes(lowerQuery);
    const contentMatch = contentLower.includes(lowerQuery);

    if (tagMatch || keywordMatch || titleMatch || contentMatch) {
      results.push({
        sectionId: section.id,
        title: section.title,
        matchedTags: section.tags.filter(tag => tag.toLowerCase().includes(lowerQuery)),
        matchedKeywords: section.keywords.filter(kw => kw.toLowerCase().includes(lowerQuery)),
        relevanceScore: (tagMatch ? 3 : 0) + (keywordMatch ? 2 : 0) + (titleMatch ? 2 : 0) + (contentMatch ? 1 : 0)
      });
    }
  }

  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return results;
}

function filterByTag(tag) {
  if (!tag) return [];

  const lowerTag = tag.toLowerCase();
  return contentMap.sections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  ).map(section => ({
    sectionId: section.id,
    title: section.title,
    tags: section.tags
  }));
}

function getAllTags() {
  return [...new Set(contentMap.sections.flatMap(s => s.tags))];
}

function formatSearchResults(results) {
  if (results.length === 0) return "没有找到相关结果";

  let output = `在 ${contentMap.siteName} 中找到 ${results.length} 个匹配分区：\n`;
  results.forEach((r, index) => {
    output += `${index + 1}. ${r.title}（ID: ${r.sectionId}）\n`;
    if (r.matchedTags.length > 0) {
      output += `   匹配标签：${r.matchedTags.join(", ")}\n`;
    }
    if (r.matchedKeywords.length > 0) {
      output += `   匹配关键词：${r.matchedKeywords.join(", ")}\n`;
    }
    output += `   相关性评分：${r.relevanceScore}\n`;
  });
  return output;
}

// 示例调用
console.log("=== 搜索示例：爱游戏 ===");
console.log(formatSearchResults(searchSections("爱游戏")));

console.log("\n=== 按标签过滤：动作 ===");
const actionSections = filterByTag("动作");
actionSections.forEach(s => {
  console.log(`- ${s.title} (标签: ${s.tags.join(", ")})`);
});

console.log("\n=== 所有可用标签 ===");
console.log(getAllTags().join(", "));

// 导出模块（适用于 Node.js 或打包工具）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchSections,
    filterByTag,
    getAllTags,
    formatSearchResults
  };
}