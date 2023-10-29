/**
 * edited by Wesley Yao on Jun 14, 2022
 * 笨办法，请大家友情优化！
 */
const lodash = require("lodash");

/** 产生霍兰德测试结果数据 (传入的参数是按照得分从高到低排好序的霍兰德code数据)
 * note: codes are R,I,A,S,E,C (该顺序为固有顺序)
 */
function genereateHollandTestResult(orderedTopics) {
  /** 最终结果数组，保存筛选过的三个code的数据 */
  let finalTopics = [];
  let numberOfTopics = orderedTopics.length;

  if (numberOfTopics !== 6) {
    return finalTopics;
  }
  /** 找到得分最多且相等分数的code的个数 */
  if (orderedTopics[0].total === orderedTopics[2].total) {
    numberOfTopics = 3;
  } else if (orderedTopics[0].total === orderedTopics[3].total) {
    numberOfTopics = 4;
  } else if (orderedTopics[0].total === orderedTopics[4].total) {
    numberOfTopics = 5;
  } else {
    numberOfTopics = orderedTopics.length;
  }
  /** 遍历上面得到的个数 */
  for (let i = 0; i < numberOfTopics; i++) {
    /** 每次遍历开始，定义一个空的标准差数组 */
    let deviationList = [];
    /** 当最终返回code数据个数到达三个时，退出遍历 */
    // if (finalTopics.length === 3) {
    //   break;
    // }
    /** 嵌套一个遍历， 用来对比外部遍历的code与其下一个位置的code数据 */
    for (let j = 1; j < numberOfTopics; j++) {
      /** 如果内外遍历的当前code id一致，或者外部遍历次数大于等于内部的，则跳过本次遍历 */
      if (orderedTopics[i].id === orderedTopics[j].id || i >= j) {
        continue;
      }
      /** 比较内外遍历code数据的得分，将两个相同得分的code数据存入标准差数组 */
      if (orderedTopics[i].total === orderedTopics[j].total) {
        deviationList.push({ ...orderedTopics[i] }, { ...orderedTopics[j] });
      }
    }
    /** 当标准差数组不为空时执行 */
    if (deviationList.length > 0) {
      /** 去除重复id的数据 */
      deviationList = lodash.uniqBy(deviationList, "id");
      /** 将code数据重新排序，按照标准差值从小到大 */
      deviationList = deviationList.sort((a, b) => a.deviation - b.deviation);
      /** 当标准差数组中的code大于等于三个时执行 */
      if (deviationList.length >= 3) {
        deviationList = deviationList.sort((a, b) => {
          /** 当前后数据的标准差一样时，按照code的固有次序重新排序 */
          if (a.deviation === b.deviation) {
            return a.sequence - b.sequence;
          } else {
            /** 否则按照标准差值从小到大排序 */
            return a.deviation - b.deviation;
          }
        });
        /** 将排好的code数据存入最终返回的数组 */
        finalTopics = [...deviationList];
      } else {
        /** 当标准差数组中只有两个code数据，而且它们的标准差值相等时 */
        if (
          deviationList.length === 2 &&
          deviationList[0].deviation === deviationList[1].deviation
        ) {
          /** 按照code固有次序重新排序 */
          deviationList = deviationList.sort((a, b) => a.sequence - b.sequence);
        }
        /** 保存排序后的code数据到最终返回的数组中 */
        finalTopics = finalTopics.concat(deviationList);
      }
    } else {
      /** 当没有出现相同得分的code时，保存当前的外部遍历项 */
      finalTopics.push(orderedTopics[i]);
    }
  }
  /** 去除重复id的数据 */
  finalTopics = lodash.uniqBy(finalTopics, "id");
  /** 返回最终的数组 */
  return finalTopics;
}

module.exports = genereateHollandTestResult;
