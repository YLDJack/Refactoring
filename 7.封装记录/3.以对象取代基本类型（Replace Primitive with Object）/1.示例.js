orders.filter((o) => "high" === o.priority || "rush" === o.priority);

//=========================================>

orders.filter((o) => o.priority.higherThan(new Priority("normal")));
