function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) return 0;
  if (anEmployee.monthsDisabled > 12) return 0;
  if (anEmployee.isPartTime) return 0;
}

//这里有一连串的条件检查，都指向同样的结果。既然结 果是相同的，就应该把这些条件检查合并成一条表达式。对 于这样顺序执行的条件检查，可以用逻辑或运算符来合并
//合并完成后，再对这句条件表达式使用提炼函数

function disabilityAmount(anEmployee) {
  if (isNotEligableForDisability()) return 0; // compute the disability amount
  
  function isNotEligableForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthsDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}
