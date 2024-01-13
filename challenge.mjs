const transformFunc = (weirdExpression) => {
  const parts = weirdExpression.split(" ");
  const operator = {
    ebong: "&&",
    othoba: "||",
  };
  const transformParts = parts.map((part) => operator[part] || part);
  let transformedExpression = transformParts.join(" ");
  // Handle special cases:
  if (transformedExpression === "&&") {
    transformedExpression = "ebong";
  } else if (transformedExpression === "||") {
    transformedExpression = "othoba";
  } else if (
    transformedExpression.includes("&& &&") ||
    transformedExpression.includes("|| ||")
  ) {
    transformedExpression = transformedExpression.replaceAll("&&", "ebong");
    transformedExpression = transformedExpression.replaceAll("||", "othoba");
    transformedExpression = transformedExpression.replaceAll(
      "ebong ebong",
      "ebong &&"
    );
    transformedExpression = transformedExpression.replaceAll(
      "othoba othoba",
      "othoba ||"
    );
  } else if (transformedExpression.endsWith("||")) {
    const newExpression = transformedExpression.split(" ");
    newExpression.pop();
    newExpression.push("othoba");
    transformedExpression = newExpression.join(" ");
  } else if (transformedExpression.endsWith("&&")) {
    const newExpression = transformedExpression.split(" ");
    newExpression.pop();
    newExpression.push("ebong");
    transformedExpression = newExpression.join(" ");
  }

  return transformedExpression;
};

const weirdExpressions = [
  "a othoba b",
  "b ebong c othoba d",
  "ebong ebong othoba othoba ebong",
  "((ebong) othoba ebong) ebong othoba",
  "(ebong othoba (ebong ebong ((othoba)othoba(ebong))))",
  "ebong",
];

for (const expression of weirdExpressions) {
  const result = transformFunc(expression);
  console.log(result);
}
