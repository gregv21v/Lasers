class Coder {
  constructor() {
	this._objects = [];
	this._targets = [];
	this._typeCounts = {};
  }

  addObject(type, params, rotation, inToolbar) {

	// increment the count for this type
	if(this._typeCounts[type]) 
		this._typeCounts[type]++;
	else 
		this._typeCounts[type] = 1;
	this._objects.push({name: lowercaseFirst(type) + this._typeCounts[type], type, params, rotation, inToolbar});
  }



  /**
   * generateCode()
   * @description generates code based on the objects
   * @returns {string} the generated code
   */
  generateCode() {
	// for each object object in this._objects

	let variableList = "";
	let rotationList = "";
	let slotList = "";
	let targetsCode = "";
	let targetCount = 0;
	let toolCode = "";
	for(const obj of this._objects) {
		if(obj.type === "Target") {
			let slotName = "target" + targetCount + "Slot";

			variableList += 
				"	this._targets.push(new Target(" + JSON.stringify(obj.params) + "));\n";

			slotList += 
				"	let " + slotName + " = this._grid.getSlotAt(" +
					obj.params.x + ", " + obj.params.y + ");\n" +
				"	" + slotName + ".isFixed = true;\n" + 
				"	" + slotName + ".addItem(this._targets[" + targetCount + "]);\n\n";	
			
			targetCount++;
			
		} else {
			let variableName = lowercaseFirst(obj.name);
			let slotName = variableName + "Slot";

			variableList += 
				"	let " + variableName + 
				" = new " + obj.type + "(" + JSON.stringify(obj.params) + ");\n";
				
			if(obj.inToolbar) {
				toolCode += 
					"	this._toolbar.add(" + variableName + ");\n";
			} else {
				rotationList += 
					"	" + variableName + ".rotate(" + obj.rotation + ");\n";

				slotList += 
					"	let " + slotName + " = this._grid.getSlotAt(" +
						obj.params.x + ", " + obj.params.y + ");\n" +
					"	" + slotName + ".isFixed = true;\n" + 
					"	" + slotName + ".addItem(" + variableName + ");\n\n";
			}
		}
	}

	return "class Level# extends Level {" + "\n\n" +
		"    /**" + "\n" +
		"     * init" + "\n" +
		"     * @description initializes the level" + "\n" +
		"     */ " + "\n" +
		"    init(grid, toolbar) {" + "\n" +
		"        super.init(grid, toolbar);" + "\n\n" +
		variableList + "\n" + 
		rotationList + "\n" + 
		slotList + "\n" + 
		targetsCode + "\n" +
		"        // Add items to the toolbar" + "\n" +
		toolCode + 
		"    }" + "\n\n" +
		"}" + "\n";

  }

  get code() {
	return this._code;
  }
}