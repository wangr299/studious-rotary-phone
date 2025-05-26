// 班级学生名单
const students = [
    "白晨阳", "常曦文", "程继熙", "耿楷智", "韩昌昊", "韩文康", "姜来田", "李彬", "李承建", "李圣杰", 
    "马锦源", "马钲凯", "钱建宇", "乔佳乐", "乔治", "史浩然", "宋子凡", "孙坤", "孙亚南", "汪紫浩", 
    "王蕊", "王万涛", "王兆磊", "王志远", "王昊", "魏成祺", "吴前辉", "颜逸凡", "杨恭权", "尹姝涵", 
    "尹皓琦", "喻皓天", "詹子睿", "张家慧", "张金政", "张云飞", "张璇", "赵晟羽", "朱乐民"
];

// DOM元素
const currentStudentEl = document.getElementById('currentStudent');
const studentListEl = document.getElementById('studentList');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const historyListEl = document.getElementById('historyList');

// 系统变量
let timer;
let currentIndex = -1;
let isRunning = false;
let speed = 100; // 初始速度(ms)
let acceleration = 1.1; // 加速因子
let studentItems = [];

// 初始化学生列表
function initStudentList() {
    studentListEl.innerHTML = '';
    students.forEach((student, index) => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';
        studentItem.textContent = student;
        studentItem.dataset.index = index;
        studentListEl.appendChild(studentItem);
    });
    studentItems = document.querySelectorAll('.student-item');
}

// 获取随机索引(确保不连续重复)
function getRandomIndex() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * students.length);
    } while (newIndex === currentIndex && students.length > 1);
    return newIndex;
}

// 更新显示的学生
function updateDisplay(index) {
    // 清除所有高亮
    studentItems.forEach(item => item.classList.remove('highlight'));
    
    // 高亮当前学生
    if (index >= 0 && index < students.length) {
        currentIndex = index;
        currentStudentEl.textContent = students[index];
        studentItems[index].classList.add('highlight');
    }
}

// 添加到历史记录
function addToHistory(student) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <span>${student}</span>
        <span>${timeString}</span>
    `;
    
    // 插入到最前面
    if (historyListEl.firstChild) {
        historyListEl.insertBefore(historyItem, historyListEl.firstChild);
    } else {
        historyListEl.appendChild(historyItem);
    }
}

// 开始随机选择
function startSelection() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    speed = 100; // 重置速度
    
    // 初始化显示
    currentStudentEl.textContent = "选择中...";
    
    // 随机选择循环
    timer = setInterval(() => {
        const randomIndex = getRandomIndex();
        updateDisplay(randomIndex);
        
        // 加速效果
        if (speed > 30) {
            speed /= acceleration;
            clearInterval(timer);
            timer = setInterval(arguments.callee, speed);
        }
    }, speed);
}

// 停止随机选择
function stopSelection() {
    if (!isRunning) return;
    
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    // 添加选中记录
    if (currentIndex >= 0) {
        addToHistory(students[currentIndex]);
    }
}

// 事件监听
startBtn.addEventListener('click', startSelection);
stopBtn.addEventListener('click', stopSelection);

// 初始化系统
initStudentList();