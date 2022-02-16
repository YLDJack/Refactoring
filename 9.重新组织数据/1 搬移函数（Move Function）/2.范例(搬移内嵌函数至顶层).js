function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
  return { time: totalTime, distance: totalDistance, pace: pace };
  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
    return result;
  }
  function distance(p1, p2) {}
  function radians(degrees) {}
  function calculateTime() {}
}

//我希望把calculateDistance函数搬移到顶层，这样我就 能单独计算轨迹的距离，而不必算出汇总报告（summary） 的其他部分。

function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
  return { time: totalTime, distance: totalDistance(points), pace: pace };
}
function totalDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

function distance(p1, p2) {}
function radians(degrees) {}
