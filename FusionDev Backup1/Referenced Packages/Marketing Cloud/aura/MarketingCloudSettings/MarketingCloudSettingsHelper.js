({
    setLastLogRequest : function(component, storedValue) {
        var lastLogRequestDateTime = new Date(storedValue);
        var currentDateTime = new Date();      
        var differenceMilliseconds =  currentDateTime.getTime() - lastLogRequestDateTime.getTime();
        var differenceMinutes = differenceMilliseconds / 60 / 1000;
        if(differenceMinutes < 60){
            component.find("viewLogging").set("v.value", $A.get("$Label.et4ae5.loggingOn"));
            component.find("editLogging").set("v.value", $A.get("$Label.et4ae5.loggingOn"));
            $(".viewSettingsLoggingOn-component").removeAttr("hidden");
        }else{
            component.find("editLogging").set("v.value", $A.get("$Label.et4ae5.loggingOff"));   
            $(".viewSettingsLoggingOff-component").removeAttr("hidden");
        } 
    },    
    
    setUpDeepLinks : function(component, storedValue) {
        var saaSelected = false;
        var aSelected = false;
        var oSelected = false;
        if(storedValue == "OFF") {
            component.find("viewDeepLink").set("v.value",$A.get("$Label.et4ae5.off"));
            oSelected = true;
        }       
        else if (storedValue == "ADMINSONLY") {
            component.find("viewDeepLink").set("v.value",$A.get("$Label.et4ae5.onlyAdm"));
            aSelected = true;
        }
        else {
            component.find("viewDeepLink").set("v.value",$A.get("$Label.et4ae5.bothAdmUsr"));
            saaSelected = true;
        }
        //Deep Link picklist
        var dlOpts = [
            { label: $A.get("$Label.et4ae5.off"), value: "OFF", selected: oSelected },
            { label: $A.get("$Label.et4ae5.onlyAdm"), value: "ADMINSONLY", selected: aSelected },
            { label: $A.get("$Label.et4ae5.bothAdmUsr"), value: "STANDARDANDADMINS", selected: saaSelected }
        ];
        component.find("editDeepLinkAvailability").set("v.options", dlOpts);
    },

    setUpTSRestrictions : function(component, storedValue) {
        var aSelected = false;
        var bSelected = false;
        if(storedValue) {
            component.find("viewRestriction").set("v.value",$A.get("$Label.et4ae5.tSonlyAdm"));
            aSelected = true;
        }       
        else {
            component.find("viewRestriction").set("v.value",$A.get("$Label.et4ae5.tSbothAdmUsr"));
            bSelected = true;
        }
        //Restrictions picklist
        var dlOpts = [
            { label: $A.get("$Label.et4ae5.tSonlyAdm"), value: "AdminsOnly", selected: aSelected },
            { label: $A.get("$Label.et4ae5.tSbothAdmUsr"), value: "StandardAndAdmins", selected: bSelected }
        ];
        component.find("editRestriction").set("v.options", dlOpts);
    },

    calculateTSRestrictions : function(selectedValue) {
        if(selectedValue == "AdminsOnly")
            return true;
        else
            return false;
    },

    setUpTrackingFrequencies : function (component, selectedValue) {
        var hourlySelected = false;
        if(selectedValue == "Hourly"){
            hourlySelected = true;
            component.find("viewTrackingFrequency").set("v.value", $A.get("$Label.et4ae5.hourly"));
        }else{
            component.find("viewTrackingFrequency").set("v.value", $A.get("$Label.et4ae5.Daily"));
        }
        //Tracking Frequencies picklist
        var dlOpts = [
            { label: $A.get("$Label.et4ae5.hourly"), value: "Hourly", selected: hourlySelected},
            { label: $A.get("$Label.et4ae5.daily"), value: "Daily", selected: !hourlySelected}
        ];
        component.find("editTrackingFrequency").set("v.options", dlOpts);       
    },
    
    setUpUsername : function (component, selectedValue) {
        component.find("viewUserName").set("v.value", selectedValue);
    },
    
    setUpSendTypes : function (component, sendTypes, selectedSendTypes) {
        sendTypes.forEach( function (val) {
            if(val.toLowerCase() === "mobile"){
                $(".mobilesendtype-component").removeAttr("hidden");
            }
        });
        if(selectedSendTypes){
            selectedSendTypesArray = selectedSendTypes.split(";");
            var sSendTypesView = '';
            if(typeof selectedSendTypesArray[0] !== "undefined") {
                selectedSendTypesArray.forEach( function (val) {
                    if(sSendTypesView.length > 0){
                        sSendTypesView += ';';
                    }
                    if(val.toLowerCase() === "email"){
                        component.find("editSendTypesEmail").set("v.value", true);
                        sSendTypesView += $A.get("$Label.et4ae5.email");
                    }
                    if(val.toLowerCase() === "mobile"){
                        component.find("editSendTypesMobile").set("v.value", true);
                        sSendTypesView += $A.get("$Label.et4ae5.mobile");
                    }
                });
            }
            component.find("viewSendTypes").set("v.value", sSendTypesView);
        }
    },

    buildSendTypesString : function(component) {
        var inputEmailSendType =  component.find("editSendTypesEmail");
        var inputMobileSendType = component.find("editSendTypesMobile");
        var returnVal = '';
        if(!(inputEmailSendType.get("v.value") || inputMobileSendType.get("v.value"))) {
            //Set errors
            inputEmailSendType.set("v.errors",[{message : $A.get("$Label.et4ae5.msg0233")}]);
        }
        else {
            //Clear errors
            inputEmailSendType.set("v.errors", null);
            if(inputEmailSendType.get("v.value")){
                returnVal += "Email";
            }
            if(inputEmailSendType.get("v.value") && inputMobileSendType.get("v.value")){
                returnVal += ";";
            }
            if(inputMobileSendType.get("v.value")){
                returnVal += "Mobile";
            }            
        }

        return returnVal;
    },

    setAlternateReplyto : function(component, storedValue) {
        if(storedValue){
            component.find("viewAlternateReplyto").set("v.value", $A.get("$Label.et4ae5.enabled"));    
        }else{
            component.find("viewAlternateReplyto").set("v.value", $A.get("$Label.et4ae5.disabled"));    
        }
    },
    
    setUpRetryView : function(component, retryBool) {
        if(retryBool)
            component.find("viewRetryFailedSends").set("v.value", $A.get("$Label.et4ae5.retry"));
        else
            component.find("viewRetryFailedSends").set("v.value", $A.get("$Label.et4ae5.doNotRetry"));
    },
    
    setUpPersonalReportsView : function(component, personalReportsBool) {
        if(personalReportsBool)
            component.find("viewPersonalCustomReport").set("v.value", $A.get("$Label.et4ae5.allowed"));
        else
            component.find("viewPersonalCustomReport").set("v.value", $A.get("$Label.et4ae5.notAllowed"));        
    },
    
    setUpCampaignMemberView : function(component, cmIntEnabledBool) {
        if(cmIntEnabledBool)
            component.find("viewCampaignMemberTracking").set("v.value", $A.get("$Label.et4ae5.enabled"));
        else
            component.find("viewCampaignMemberTracking").set("v.value", $A.get("$Label.et4ae5.disabled"));                
    },
    
    setUpAudiences : function (component, selectedAudiences, selectedExclusions) {
        if(selectedAudiences){
            selectedAudiencesArray = selectedAudiences.split(";");
            var sAudiencesView = '';
            if(typeof selectedAudiencesArray[0] !== "undefined") {
                selectedAudiencesArray.forEach( function (val) {
                    if(sAudiencesView.length > 0){
                        sAudiencesView += ';';
                    }
                    if(val.toLowerCase() === "report"){
                        component.find("editTargetAudienceReport").set("v.value", true);
                        sAudiencesView += $A.get("$Label.et4ae5.report");
                    }
                    if(val.toLowerCase() === "campaign"){
                        component.find("editTargetAudienceCampaign").set("v.value", true);
                        sAudiencesView += $A.get("$Label.et4ae5.campaign");
                    }
                });
            }
            component.find("viewTargetAudience").set("v.value", sAudiencesView);
        }
        if(selectedExclusions){
            selectedExclusionsArray = selectedExclusions.split(";");
            var sExclusionAudiencesView = '';
            if(typeof selectedExclusionsArray[0] !== "undefined") {
                selectedExclusionsArray.forEach( function (val) {
                    if(sExclusionAudiencesView.length > 0){
                        sExclusionAudiencesView += ';';
                    }
                    if(val.toLowerCase() === "report"){
                        component.find("editExculsionAudienceReport").set("v.value", true);
                        sExclusionAudiencesView += $A.get("$Label.et4ae5.report");
                    }
                    if(val.toLowerCase() === "campaign"){
                        component.find("editExculsionAudienceCampaign").set("v.value", true);
                        sExclusionAudiencesView += $A.get("$Label.et4ae5.campaign");
                    }
                });
            }
            component.find("viewExculsionAudience").set("v.value", sExclusionAudiencesView);
        }      
    },

    buildAudiencesString : function(component) {
        var inputTargetAudienceReport =  component.find("editTargetAudienceReport");
        var inputTargetAudienceCampaign = component.find("editTargetAudienceCampaign");
        var returnVal = '';
        if(!(inputTargetAudienceReport.get("v.value") || inputTargetAudienceCampaign.get("v.value"))) {
            //Set errors
            inputTargetAudienceReport.set("v.errors",[{message : $A.get("$Label.et4ae5.msg0234")}]);
        }
        else {
            //Clear errors
            inputTargetAudienceReport.set("v.errors", null);        
            var returnVal = '';
            if(inputTargetAudienceReport.get("v.value")){
                returnVal += "Report";
            }
            if(inputTargetAudienceReport.get("v.value") && inputTargetAudienceCampaign.get("v.value")){
                returnVal += ";";
            }
            if(inputTargetAudienceCampaign.get("v.value")){
                returnVal += "Campaign";
            }
        }
        return returnVal;    
    },
    
    buildExclusionsString : function(component) {
        var returnVal = '';
        if(component.find("editExculsionAudienceReport").get("v.value")){
            returnVal += "Report";
        }
        if(component.find("editExculsionAudienceReport").get("v.value") && component.find("editExculsionAudienceCampaign").get("v.value")){
            returnVal += ";";
        }
        if(component.find("editExculsionAudienceCampaign").get("v.value")){
            returnVal += "Campaign";
        }
        return returnVal;    
    },
      
    setUpTriggeredSendObjects : function(component, tsObjs, selectedObjects) {
        var allObjects = {};   
        var leftListObjects = [];
        tsObjs.availableObjects.forEach( function (val) {
            if(!selectedObjects)
                leftListObjects.push(val.objLabel);
            else if(selectedObjects.indexOf(val.apiName) === -1)
                leftListObjects.push(val.objLabel);
            allObjects[val.objLabel] = val.apiName;
        });
        component.set("v.enabledObjectsAvailable", leftListObjects);
        if(selectedObjects){
            var rightListObjects = [];
            var selectedObjectsArray = [];
            var selectedObjectsViewMode = '';
            selectedObjectsArray = selectedObjects.split(";");
            if(typeof selectedObjectsArray[0] !== "undefined") {
                tsObjs.selectedObjects.forEach( function (val) {
                    rightListObjects.push(val.objLabel);
                    selectedObjectsViewMode += val.objLabel + ";";
                    allObjects[val.objLabel] = val.apiName;
                });
                selectedObjectsViewMode = selectedObjectsViewMode.substring(0,selectedObjectsViewMode.length - 1);
            }
            component.set("v.enabledObjectsSelected", rightListObjects); 
            component.find("viewEnabledObjects").set("v.value", selectedObjectsViewMode);   
        }
        component.set("v.trigSendsAPINameRefJSON", JSON.stringify(allObjects));
    },
    
    buildTrigSendObjectsString : function(selectedObjects, component) {
        var allObjects = JSON.parse(component.get("v.trigSendsAPINameRefJSON"));
        var trigSendsString = '';
        if(typeof selectedObjects[0] !== "undefined") {
            selectedObjects.forEach( function (val) {
                trigSendsString += allObjects[val] + ";";
            });
            trigSendsString = trigSendsString.substring(0,trigSendsString.length - 1);
        }
        return trigSendsString;
    },

    setUpTrackingEnablement : function (component, aggrTracking, indTracking, ldTracking, sentEvtTracking) {
        component.find("viewAggregateTracking").set("v.value", aggrTracking);
        component.find("viewIndividualTracking").set("v.value", indTracking);
        component.find("viewLinkDetailsTracking").set("v.value", ldTracking);
        component.find("viewSentEventsTracking").set("v.value", sentEvtTracking);
    },
    
    validateSupportTicketRecipient : function(component, recipientEmail) {
        var re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        if ($A.util.isUndefined(recipientEmail) || recipientEmail === "")
            component.find("editSupportTicketRecipient").set("v.errors",[{message : $A.get("$Label.et4ae5.msg0235")}]);    
        else if(!re.test(recipientEmail))
            component.find("editSupportTicketRecipient").set("v.errors",[{message : $A.get("$Label.et4ae5.msg0236")}]);
        else
            component.find("editSupportTicketRecipient").set("v.errors", null);
    },
    
    determineNumberOfDaysTracked : function (component, daysTracked) {
        if($A.util.isUndefined(daysTracked) || daysTracked === "") {
            if(component.find("editAggregateTracking").get("v.value"))
                component.find("editNumberDaysTracked").set("v.errors", [{message : $A.get("$Label.et4ae5.msg0237")}]);
            else {               
                daysTracked = 0;
                component.find("editNumberDaysTracked").set("v.errors", null);    
            }
        }   
        // Is input numeric?
        else if (isNaN(daysTracked)) {
            // Set error
            component.find("editNumberDaysTracked").set("v.errors", [{message : $A.get("$Label.et4ae5.msg0237")}]);
        }
        else if (daysTracked > 365 || daysTracked < 0) {
            component.find("editNumberDaysTracked").set("v.errors", [{message : $A.get("$Label.et4ae5.msg0237")}]);    
        }
        else {
            // Clear error
            component.find("editNumberDaysTracked").set("v.errors", null);
        }
        return daysTracked;                
    },
    
    determineEditMode : function (component, configuration) {
        if(typeof configuration !== "undefined") {
            if(typeof configuration.et4ae5__Send_Types__c === "undefined" && typeof configuration.et4ae5__Target_Audience__c === "undefined" && typeof configuration.et4ae5__Support_Ticket_Recipient__c === "undefined") {
                return true;    
            }
        }
        return false;
    },
    
    removeValues : function(component, values, removevalues) {
        $.each(removevalues, function(i, removevalue) {
            if(removevalue.length > 0){
                var index = $.inArray(removevalue, values);
                if(index != -1){
                    values.splice(index, 1);
                }
            }
        });
        return values; 
    },
    
    addValues : function(component, values, addvalues) {
        $.each(addvalues, function(i, addvalue) {
            if(addvalue.length > 0){
                var found = $.inArray(addvalue, values);
                if (found == -1) {
                    values.push(addvalue);
                }
            }
        });
        return values;
    },

    moveValueUp : function(component, values, value) {
        if(value.length > 0){
            var index = $.inArray(value, values);
            if (index > 0) {
                values.splice(index, 1);
                values.splice(index - 1, 0, value);
            }
        }
        return values;
    },
    
    moveValueDown : function(component, values, value) {
        if(value.length > 0){
            var index = $.inArray(value, values);
            if (index < values.length) {
                values.splice(index, 1);
                values.splice(index + 1, 0, value);
            }
        }
        return values;
    },
    
    editMCSettings : function (component) {
        $(".editSettings-component").each(function() {
            $(this).removeAttr("hidden");
        });
        var editLoggingComponent = component.find('editLogging');
        var editLoggingValue = editLoggingComponent.get("v.value");
        if(editLoggingValue == $A.get("$Label.et4ae5.loggingOn")){
            $(".viewSettingsLoggingOn-component").attr("hidden", "true");
        }else{
            $(".viewSettingsLoggingOff-component").attr("hidden", "true");
        }     
        $(".viewSettings-component").each(function() {
            $(this).attr("hidden", "true");
        });
    }
})