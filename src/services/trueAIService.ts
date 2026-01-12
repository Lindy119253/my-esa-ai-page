// src/services/trueAIService.ts
class TrueAIService {
  // 知识库：编程、技术、学习资源
  private knowledgeBase = {
    // 编程语言
    'javascript': {
      description: 'JavaScript 是一种高级的、解释型的编程语言，主要用于 Web 开发。',
      concepts: ['变量声明', '函数', '对象', '数组', 'DOM 操作', '异步编程', 'ES6+ 新特性'],
      resources: ['MDN Web Docs', 'JavaScript.info', 'Eloquent JavaScript']
    },
    'typescript': {
      description: 'TypeScript 是 JavaScript 的超集，添加了静态类型系统。',
      concepts: ['类型注解', '接口', '泛型', '枚举', '装饰器'],
      resources: ['TypeScript 官方文档', 'TypeScript Deep Dive']
    },
    'python': {
      description: 'Python 是一种高级、解释型、通用编程语言，以简洁易读著称。',
      concepts: ['列表推导式', '装饰器', '生成器', '上下文管理器', '异步IO'],
      resources: ['Python 官方文档', 'Real Python', 'Python Crash Course']
    },
    
    // 前端框架
    'react': {
      description: 'React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发。',
      concepts: ['组件', '状态', '属性', '生命周期', 'Hooks', 'Context', '虚拟DOM'],
      resources: ['React 官方文档', 'React 中文文档', 'Create React App']
    },
    'vue': {
      description: 'Vue 是一个渐进式 JavaScript 框架，用于构建用户界面。',
      concepts: ['响应式系统', '组件', '指令', '计算属性', '侦听器', 'Vuex', 'Vue Router'],
      resources: ['Vue 官方文档', 'Vue Mastery', 'Vue School']
    },
    'angular': {
      description: 'Angular 是一个基于 TypeScript 的开源 Web 应用框架。',
      concepts: ['模块', '组件', '服务', '依赖注入', '指令', '管道', 'RxJS'],
      resources: ['Angular 官方文档', 'Angular University']
    },
    
    // 后端技术
    'node.js': {
      description: 'Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。',
      concepts: ['事件循环', '模块系统', '流', 'Buffer', '异步IO', 'Cluster'],
      resources: ['Node.js 官方文档', 'Node.js Design Patterns']
    },
    'express': {
      description: 'Express 是一个快速、开放、极简的 Node.js Web 应用框架。',
      concepts: ['中间件', '路由', '模板引擎', '错误处理', 'REST API'],
      resources: ['Express 官方文档', 'Express 指南']
    },
    
    // 数据库
    'mongodb': {
      description: 'MongoDB 是一个基于分布式文件存储的 NoSQL 数据库。',
      concepts: ['文档', '集合', '索引', '聚合管道', '复制集', '分片'],
      resources: ['MongoDB 官方文档', 'MongoDB University']
    },
    'mysql': {
      description: 'MySQL 是一个开源的关系型数据库管理系统。',
      concepts: ['表', '索引', '事务', '存储引擎', 'SQL 优化'],
      resources: ['MySQL 官方文档', 'MySQL Tutorial']
    },
    
    // 工具和概念
    'git': {
      description: 'Git 是一个分布式版本控制系统，用于跟踪代码变更。',
      concepts: ['提交', '分支', '合并', '变基', '远程仓库', '标签'],
      resources: ['Pro Git 电子书', 'Git 官方文档', 'GitHub Learning Lab']
    },
    'docker': {
      description: 'Docker 是一个容器化平台，用于打包、分发和运行应用程序。',
      concepts: ['镜像', '容器', 'Dockerfile', 'Docker Compose', 'Docker Hub'],
      resources: ['Docker 官方文档', 'Docker 入门教程']
    },
  };

  // 常见问题模板
  private templates = {
    introduction: (name: string) => `关于 ${name}，这是一个${this.getRandomAdjective()}技术。让我为您详细介绍：\n\n`,
    learningPath: (topic: string) => `学习 ${topic} 的建议路径：\n1. 基础语法和概念\n2. 核心特性掌握\n3. 项目实践\n4. 深入原理\n5. 社区参与\n`,
    comparison: (tech1: string, tech2: string) => `${tech1} 和 ${tech2} 的主要区别：\n• 设计理念不同\n• 生态系统差异\n• 学习曲线不同\n• 适用场景有别\n`,
  };

  // 随机形容词
  private adjectives = ['非常流行的', '功能强大的', '广泛使用的', '现代高效的', '社区活跃的', '易于上手的'];

  private getRandomAdjective(): string {
    return this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
  }

  // 智能问答主函数
  async askQuestion(question: string): Promise<string> {
    const lowerQuestion = question.toLowerCase().trim();
    
    // 1. 问候类问题
    if (this.isGreeting(lowerQuestion)) {
      return this.generateGreetingResponse();
    }
    
    // 2. 自我介绍类
    if (this.isSelfIntroduction(lowerQuestion)) {
      return this.generateSelfIntroduction();
    }
    
    // 3. 特定技术查询
    const techInfo = this.findTechnologyInfo(lowerQuestion);
    if (techInfo) {
      return this.generateTechResponse(techInfo.name, techInfo.data);
    }
    
    // 4. 学习建议
    if (this.isLearningQuestion(lowerQuestion)) {
      return this.generateLearningResponse(lowerQuestion);
    }
    
    // 5. 代码问题
    if (this.isCodeQuestion(lowerQuestion)) {
      return this.generateCodeResponse(lowerQuestion);
    }
    
    // 6. 对比问题
    const comparedTechs = this.findComparedTechnologies(lowerQuestion);
    if (comparedTechs) {
      return this.generateComparisonResponse(comparedTechs.tech1, comparedTechs.tech2);
    }
    
    // 7. 默认智能回复
    return this.generateIntelligentDefaultResponse(question);
  }

  // 判断是否为问候
  private isGreeting(question: string): boolean {
    const greetings = ['你好', 'hello', 'hi', 'hey', '您好', '嗨'];
    return greetings.some(greeting => question.includes(greeting));
  }

  // 判断是否为自我介绍
  private isSelfIntroduction(question: string): boolean {
    const selfKeywords = ['你是谁', '你叫什么', 'what are you', 'who are you', '你是什么', '介绍自己'];
    return selfKeywords.some(keyword => question.includes(keyword));
  }

  // 判断是否为学习问题
  private isLearningQuestion(question: string): boolean {
    const learningKeywords = ['如何学习', '怎么学', '怎样学', 'learn', 'study', '入门', '教程', '学习'];
    return learningKeywords.some(keyword => question.includes(keyword));
  }

  // 判断是否为代码问题
  private isCodeQuestion(question: string): boolean {
    const codeKeywords = ['代码', 'code', '编程', 'program', 'debug', '错误', 'bug', '优化', '性能'];
    return codeKeywords.some(keyword => question.includes(keyword));
  }

  // 查找技术信息
  private findTechnologyInfo(question: string): { name: string; data: any } | null {
    for (const [techName, techData] of Object.entries(this.knowledgeBase)) {
      if (question.includes(techName)) {
        return { name: techName, data: techData };
      }
    }
    return null;
  }

  // 查找对比的技术
  private findComparedTechnologies(question: string): { tech1: string; tech2: string } | null {
    const techs = Object.keys(this.knowledgeBase);
    const foundTechs: string[] = [];
    
    for (const tech of techs) {
      if (question.includes(tech.toLowerCase())) {
        foundTechs.push(tech);
      }
    }
    
    if (foundTechs.length >= 2) {
      return { tech1: foundTechs[0], tech2: foundTechs[1] };
    }
    
    return null;
  }

  // 生成问候回复
  private generateGreetingResponse(): string {
    const greetings = [
      '👋 你好！我是 AI 代码助手，很高兴为您服务！有什么编程相关的问题吗？',
      '🌟 您好！我是智能编程助手，专门解答技术问题和提供学习建议。',
      '🎯 嗨！欢迎使用 AI 代码助手。我可以帮您分析代码、解答技术疑问。',
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 生成自我介绍
  private generateSelfIntroduction(): string {
    return `🤖 我是 AI 代码助手，一个智能的编程学习伙伴。

💼 我能帮助您：
• 解答编程和技术问题
• 分析代码和调试建议
• 提供学习路径指导
• 解释技术概念
• 推荐学习资源

📚 我熟悉的技术包括：
- 前端：JavaScript, TypeScript, React, Vue, Angular
- 后端：Node.js, Python, Java, Go
- 数据库：MySQL, MongoDB, PostgreSQL
- 工具：Git, Docker, Kubernetes

有什么具体问题需要我帮忙吗？`;
  }

  // 生成技术回复
  private generateTechResponse(techName: string, techData: any): string {
    return `📖 关于 **${techName.toUpperCase()}**：

${this.templates.introduction(techName)}**描述**：${techData.description}

**核心概念**：
${techData.concepts.map((concept: string, index: number) => `  ${index + 1}. ${concept}`).join('\n')}

**学习资源**：
${techData.resources.map((resource: string, index: number) => `  ${index + 1}. ${resource}`).join('\n')}

${this.templates.learningPath(techName)}

需要深入了解某个具体概念吗？`;
  }

  // 生成学习回复
  private generateLearningResponse(question: string): string {
    const techs = Object.keys(this.knowledgeBase);
    const foundTech = techs.find(tech => question.includes(tech.toLowerCase()));
    
    if (foundTech) {
      return this.generateTechResponse(foundTech, this.knowledgeBase[foundTech as keyof typeof this.knowledgeBase]);
    }
    
    return `📚 学习建议：

1. **明确目标**：确定你想学什么，为什么要学
2. **系统学习**：按照教程或课程一步步来
3. **动手实践**：边学边写代码，做小项目
4. **遇到问题**：先尝试自己解决，再寻求帮助
5. **持续进步**：技术更新快，保持学习习惯

您想学习什么具体的技术呢？`;
  }

  // 生成代码回复
  private generateCodeResponse(question: string): string {
    const responses = [
      `🔧 代码问题分析：

**调试步骤**：
1. 仔细阅读错误信息
2. 检查控制台输出
3. 使用调试工具设置断点
4. 逐行检查代码逻辑
5. 搜索类似问题和解决方案

**优化建议**：
• 使用有意义的变量名
• 保持函数单一职责
• 添加适当注释
• 考虑性能和可读性
• 编写单元测试

有具体的代码需要我帮忙分析吗？`,
      
      `💻 编程建议：

**代码质量**：
1. 遵循编码规范
2. 使用版本控制
3. 代码审查
4. 持续集成
5. 自动化测试

**最佳实践**：
• 避免全局变量
• 处理所有可能的错误
• 使用适当的数据结构
• 考虑可扩展性
• 文档化重要决策

想了解哪方面的编程实践？`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // 生成对比回复
  private generateComparisonResponse(tech1: string, tech2: string): string {
    const tech1Data = this.knowledgeBase[tech1 as keyof typeof this.knowledgeBase];
    const tech2Data = this.knowledgeBase[tech2 as keyof typeof this.knowledgeBase];
    
    if (!tech1Data || !tech2Data) {
      return this.generateIntelligentDefaultResponse(`${tech1} vs ${tech2}`);
    }
    
    return `⚖️ **${tech1.toUpperCase()} 与 ${tech2.toUpperCase()} 对比**：

**${tech1.toUpperCase()}**：
${tech1Data.description}

**${tech2.toUpperCase()}**：
${tech2Data.description}

**主要差异**：
1. 设计理念和目标不同
2. 生态系统和社区规模
3. 学习曲线和上手难度
4. 性能和适用场景
5. 就业市场和行业采用率

**选择建议**：
• 如果是初学者，建议从 ${Math.random() > 0.5 ? tech1 : tech2} 开始
• 项目需求决定技术选型
• 团队熟悉度也很重要
• 考虑长期维护成本

需要更详细的分析吗？`;
  }

  // 生成智能默认回复
  private generateIntelligentDefaultResponse(question: string): string {
    const responses = [
      `🤔 关于"${question}"，这是一个很好的问题！让我为您提供专业的分析：

**从技术角度**：
1. 理解问题的核心需求
2. 分析可用的解决方案
3. 评估各种方案的优缺点
4. 选择最适合的实施方案

**从学习角度**：
1. 明确学习目标
2. 寻找优质学习资源
3. 制定学习计划
4. 实践和巩固知识

需要我具体从哪个方面展开呢？`,
      
      `🎯 我理解您的问题"${question}"。作为编程助手，我可以从这些角度帮助您：

**技术实现**：提供代码示例和架构设计
**问题解决**：分析问题原因和解决方案
**学习指导**：推荐学习路径和资源
**最佳实践**：分享行业标准和经验

您最关心哪个方面？我可以详细展开。`,
      
      `💡 对于"${question}"，我的建议是：

1. **先理解基础概念**，建立知识框架
2. **动手实践**，通过项目加深理解
3. **遇到具体问题**时深入研究
4. **持续学习**，关注技术发展趋势

有具体的背景信息可以分享吗？这样我能给出更精准的建议。`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const trueAIService = new TrueAIService();
