// src/utils/line.reporter.js
import axios from 'axios';

class LineReporter {
  // result => { status, suites, errors, ... } แต่สำหรับสรุปง่ายเราจะนับผ่าน/ล้มเหลวเอง
  async onEnd(result) {
    const token = process.env.LINE_ACCESS_TOKEN;
    const userId = process.env.LINE_USER_ID;

    if (!token || !userId) {
      console.log('LINE token or user ID not found. Skipping notification.');
      return;
    }

    // นับ passed/failed/skipped จาก suites
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    function countTests(suites) {
      for (const suite of suites) {
        if (suite.tests) {
          for (const t of suite.tests) {
            if (t.status === 'passed') passed++;
            else if (t.status === 'failed') failed++;
            else if (t.status === 'skipped') skipped++;
          }
        }
        if (suite.suites) countTests(suite.suites);
      }
    }

    if (result.suites) countTests(result.suites);

    let text = `✅ Playwright Test Report ✅\n- Passed: ${passed}\n- Failed: ${failed}\n- Skipped: ${skipped}`;
    text += failed > 0 ? `\n\n🚨 Some tests failed! Please check.` : `\n\n🎉 All tests passed successfully!`;

    const message = { type: 'text', text };

    try {
      await axios.post(
        'https://api.line.me/v2/bot/message/push',
        { to: userId, messages: [message] },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        }
      );
      console.log('✅ LINE message sent successfully');
    } catch (error) {
      console.error(
        '❌ Failed to send LINE message:',
        error.response && error.response.data ? error.response.data : error.message
      );
    }
  }
}

export default LineReporter;
