function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;
  if (medicalExam.isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
  let certificationGrade = "regular";
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = "low";
    result -= 5;
  }
  result -= Math.max(healthLevel - 5, 0);
  return result;
}

function score(candidate, medicalExam, scoringGuide) {
  return new Scorer().execute(candidate, medicalExam, scoringGuide);
}
//我首先创建一个空的类，用搬移函数（198）把上述函 数搬到这个类里去。
class Scorer {
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    if (medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = "low";
      result -= 5;
    }
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}

//大多数时候，我更愿意在命令对象的构造函数中传入参 数，而不让execute函数接收参数。在这样一个简单的拆解场 景中，这一点带来的影响不大；但如果我要处理的命令需要 更复杂的参数设置周期或者大量定制，上述做法就会带来很 多便利：多个命令类可以分别从各自的构造函数中获得各自 不同的参数，然后又可以排成队列挨个执行，因为它们的 execute函数签名都一样。

//可以每次搬移一个参数到构造函数

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute() {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    if (this._medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    let certificationGrade = "regular";
    if (
      this._scoringGuide.stateWithLowCertification(this._candidate.originState)
    ) {
      certificationGrade = "low";
      result -= 5;
    }
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;
    this.scoreSmoking();
    this._certificationGrade = "regular";
    if (
      this._scoringGuide.stateWithLowCertification(this._candidate.originState)
    ) {
      this._certificationGrade = "low";
      this._result -= 5;
    }
    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }
  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}
