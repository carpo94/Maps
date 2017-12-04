/* **********************************************
   VARIOUS
 ********************************************** */
/* Context Menu behaivour */
var allowContextMenu = false;
function contextMenu() { return allowContextMenu; }

/* Generates PageFoot */
function writePageFoot() {
    var output = '<div class="data">' +
        '<table width="100%"><tr><td>'+
        '<a href="#top"><img src="templates/images/gadgetTop.gif" alt="inicio" width="11" height="11"> inicio</a>' +
        '&nbsp;&nbsp;<a href="javascript:showAllToggleableSections();"><img src="templates/images/gadgetShowAll.gif" alt="Mostrar todas las secciones" width="11" height="11"> mostrar todo</a>' +
        '&nbsp;&nbsp;<a href="javascript:hideAllToggleableSections();"><img src="templates/images/gadgetHideAll.gif" alt="Ocultar todas las secciones" width="11" height="11"> ocultar todo</a>' +
        '&nbsp;&nbsp;</td><td align="right"><a href="javascript:previous();"> Anterior <img src="templates/images/gadgetLeft.gif" alt="Anterior" width="11" height="11"></a>' +
        '&nbsp;&nbsp;<a href="javascript:next();"><img src="templates/images/gadgetRight.gif" alt="Siguiente" width="11" height="11"> Siguiente</a>' +
        '</td></tr></table>'+
        '</div>';

    document.write(output);
}

/* Back Button */
function previous() {
    window.history.back();
}

/* Next Button */
function next() {
    window.history.go(1);
}

/* **********************************************
   SECTIONS
   (section = div + icon )
 ********************************************** */
var imageYes  = 'templates/images/checkOK.gif';
var imageNo   = 'templates/images/checkKO.gif';
var imageShow = 'templates/images/gadgetShow.gif';
var imageHide = 'templates/images/gadgetHide.gif';

/* Deprecated ?? */
function checkboxImage(valor) {
    if (valor == '1') document.write('<img src="' + imageYes +'" alt="si" width="10" height="10">');
    else document.write('<img src="' + imageNo + '" alt="no" width="10" height="10">');
}

/* Shows a div by its id */
function show(section) {
    obj = eval(section);
    obj.style.display = 'block';
}

/* Hide a div by its id */
function hide(section) {
    obj = eval(section);
    obj.style.display = 'none';
}

/* Shows/Hides a div by its id depending on its current 'display' status */
function toggleSection(section) {
    obj = eval(section);
    if (obj.style.display == 'none') show(section);
    else hide(section);
}

/* Shows/Hides a div depending on a data value */
function displayWithCondition(section, data, showValue) {
    if (data == showValue) show(section);
    else hide(section);
}

/* Changes an Image */
function changeImage(image, file) {
    obj = eval(image);
    obj.src = file;
}

/* Shows a section and changes its icon */
function showSection(section, icon) {
    show(section);
    changeImage(icon, imageHide);
}

/* Hides a section and changes its icon */
function hideSection(section, icon) {
    hide(section);
    changeImage(icon, imageShow);
}

/* Shows/Hides a section depending on its current 'display' status and changes its icon */
function toggleSection(section, icon) {
    obj = eval(section);
    if (obj.style.display == 'none') showSection(section, icon);
    else hideSection(section, icon);
}

/* Shows/Hides a section depending on a data value and changes its icon */
function displaySectionWithCondition(section, icon, data, showValue) {
    if (data == showValue) showSection(section, icon);
    else hideSection(section, icon);
}

/* Defines a Section as 'toggleable' */
function toggleableSection(section, icon) {
    this.section = section;
    this.icon = icon;
}

/* Shows all sections defined as 'toggleable' */
function showAllToggleableSections() {
    for (var i = 0; i < toggleableSections.length; i++)
        showSection(toggleableSections[i].section, toggleableSections[i].icon);
}

/* Hides all sections defined as 'toggleable' */
function hideAllToggleableSections() {
    for (var i = 0; i < toggleableSections.length; i++)
        hideSection(toggleableSections[i].section, toggleableSections[i].icon);
}

/* Shows/Hides all sections defined as 'toggleable' (depending on its current 'display' status) */
function toggleAllToggleableSections() {
    for (var i = 0; i < toggleableSections.length; i++)
        toggleSection(toggleableSections[i].section, toggleableSections[i].icon);
}

/* **********************************************
   MENUS
 ********************************************** */
var toggleableSections = new Array();

/* Defines a menuItems.
   There are two ways to define a menuItems:
   1) When you want to use the general funtion to POST.
   Name - Entry name
   Method - Query System Method to load the data for the template to open
   Template - htm file
   Ids - String with the arguments for the query system method
   Func - Undefined
   Arg - Undefined
   2) The template to open has a particular js function:
   Name - Entry name
   Method - Undefined
   Template - Undefined
   Ids - String with the ids needed to generate the arguments for the query system method
   Func - js function name
   Arg - (optional) String with the 'passing arguments' for the new template
 */
function menuItem(name, method, template, ids, func, arg) {
    this.name = name;
    this.method = method;
    this.template = template;
    this.ids = ids;
    this.func = func;
    this.passing_arg = arg; 
}

/* PRIVATE - Generates the HTML code for the menue */
function _generateMenu(head, menuItems, current) {
    var output = '<div class="menu">[';

    for (var i = 0; i < menuItems.length; i++) {
        output += '&nbsp;<a href="javascript:'; 

            if (menuItems[i].func == '' || "undefined" == typeof menuItems[i].func ) {
                output += 'of_postReportExtended(\'' + head + '\',\'' + menuItems[i].method + '\',\'' + menuItems[i].template + '\',\'' + menuItems[i].ids + '\',\'False'; 
                        }
                        else {
                        output += menuItems[i].func + '(\'' + head + '\',\''  + menuItems[i].ids; 
                            if (menuItems[i].passing_arg != '') {
                            output += '\',\''  + menuItems[i].passing_arg;
                            }
                            }

                            if (menuItems[i].name == current) {
                            output += '\');">' + '<span class="menuCurrent">' + menuItems[i].name + '</span></a>';
                        }
                        else {
                        output += '\');">' + menuItems[i].name + '</a>';
                        }

        output += '&nbsp;';
        if (i < menuItems.length - 1) output += '|';
    }

    output += ']</div>';
    return output;
}

/* Main Menu */
function writeMenu(head,id_customer) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Cliente','','',id_customer, '_CustomerDetail', '');
    menuItems[k++] = new menuItem('Cuentas','CF_CC_ACCOUNT_DATA','CF_CC_ACCOUNTS',id_customer + ";" + id_customer + ";" + id_customer + ";" + id_customer);
/*    menuItems[k++] = new menuItem('Saldo','','',id_customer, '_CustomerBalance', '');*/
    menuItems[k++] = new menuItem('Solicitudes Servicio / Ordenes Trabajo','CF_CC_SERV_REQ_FIELD_ORDER','CF_CC_SERV_REQ_FIELD_ORDER',id_customer + ";" + id_customer + ";" + id_customer);
    menuItems[k++] = new menuItem('Acuerdos de Pagos','CC_CF_LANDLORD_LIST','CF_CC_LANDLORD',id_customer + ";" + id_customer);
/*    menuItems[k++] = new menuItem('Ventas','CC_CF_SALES_ORDER_LIST','CF_CC_SALES_ORDER',id_customer + ";" + id_customer);
    menuItems[k++] = new menuItem('Actividades','CC_CF_ACTIVITIES_TO_DO_LIST','CF_CC_ACTIVITIES_TO_DO_LIST',id_customer + ";" + id_customer); */
    menuItems[k++] = new menuItem('Facturas del Cliente','CC_CF_BILL_NOTES','CF_CC_BILL_NOTES',id_customer + ",0,0,0;" + id_customer + ",0,0,0;1," + id_customer + ",0,0,0");
    menuItems[k++] = new menuItem('Reclamos del Cliente','CC_CF_RECLAMATION_BY_CUSTOMER','CF_CC_RECLAMATION',id_customer + ";" + id_customer );
    menuItems[k++] = new menuItem('Histórico de Contactos','CF_CC_CONTACT','CF_CC_CONTACT', id_customer + ";" + id_customer);

    document.write(_generateMenu(head, menuItems, currentMenuItem));
    return menuItems;
}

/* Account Submenu */
function writeAccountMenu(head,current,id_customer,id_account) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Detalle','','',id_account,'_AccountDetail', id_customer);
    menuItems[k++] = new menuItem('Resumen','','',id_account,'_BarLedger','');
	menuItems[k++] = new menuItem('Depósitos','CF_CB_SUBLEDGER_DEPOSIT','gccb/CF_CB_SUBLEDGER_DEPOSIT',id_account +';0,0,0,0,0,' + id_customer + ',' + id_account);
    menuItems[k++] = new menuItem('Impagados','CF_CB_COLLECTIONS_CF','gccb/CF_CB_COLLECTIONS',id_account +',0,0,0,0;0,0,0,0,0,' + id_customer + ',' + id_account);
    menuItems[k++] = new menuItem('Cuotas','CF_CB_TERMS','gccb/CF_CB_SUBLEDGER_TERMS',id_account +';0,0,0,0,0,' + id_customer + ',' + id_account);

    document.write(_generateMenu(head, menuItems, current));
    return menuItems;
}

/* Contracted Service Submenu */
function writeCSMenu(head,current,id_customer,id_account,id_cs) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Detalle','','',id_cs,'_CSDetail', id_customer);
    menuItems[k++] = new menuItem('Facturas Serv.Contratado','','',id_cs,'_CSBillNotes', id_customer + ',' + id_account );
    menuItems[k++] = new menuItem('Histórico de Consumo','','',id_cs,'_HistoricalUsage', 'CS' );

    document.write(_generateMenu(head, menuItems, current));
    return menuItems;
}

/* Premises Menu */
function writePremiseMenu(head,id_premises) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Suministro','','',id_premises,'_PremisesDetail','');
    menuItems[k++] = new menuItem('Servicios Contratados','PF_CC_CONTRACT_SERVICE','premises/PF_CC_CONTRACT_SERVICE',id_premises + ";" + id_premises + ";" + id_premises + ";" + id_premises);
    menuItems[k++] = new menuItem('Ordenes Trabajo','PF_CC_FIELD_ORDER','premises/PF_CC_SERV_REQ_FIELD_ORDER', id_premises + ";" + id_premises);
	menuItems[k++] = new menuItem('Tareas por Suministro','PF_CC_CAR_TASK','premises/PF_CC_CAR_TASK',  id_premises + ";" + id_premises);
	menuItems[k++] = new menuItem('Cargos Varios por Suministro','PF_CC_ENERGY_CHARGE_TOBILL_BYSUPPLY','premises/PF_CC_ENERGY_CHARGE_TOBILL',  id_premises + ";" + id_premises + ";" + id_premises);
	menuItems[k++] = new menuItem('Facturas por Suministro','PF_CF_CC_BILL_NOTES','premises/PF_CF_CC_BILL_NOTES', id_premises + ";" + id_premises + ";" + id_premises + ";" + id_premises );
	menuItems[k++] = new menuItem('Reclamos por Suministro','PF_CC_RECLAMATION_BY_SUPPLY','premises/PF_CC_RECLAMATION',  id_premises + ";" + id_premises);
	menuItems[k++] = new menuItem('Anafes','CF_CC_FONDO_PCIAL_ANAFE','premises/PF_CC_ANAFES',  id_premises + ";" + id_premises);	menuItems[k++] = new menuItem('Unicef','CF_CC_APORTE_SOLIDARIO_UNICEF','premises/PF_CC_UNICEF',  id_premises + ";" + id_premises);	
	menuItems[k++] = new menuItem('Documentos Archivados','PF_CC_NOTAS_POR_SUMINISTRO','premises/PF_CC_DOCUMENTOS',  id_premises + ";" + id_premises);
	menuItems[k++] = new menuItem('CER','CC_CF_CER_TAB_DEFAULT','premises/PF_CC_CER_TEMPLATE_DEFAULT',id_premises + ";" + id_premises + ";" + id_premises );
    menuItems[k++] = new menuItem('Gestión Web','PF_CC_TRAMITES_WEB_BY_IDSUPPLY','premises/PF_CC_TRAMITES_WEB',  id_premises + ";" + id_premises + ";" + id_premises + ";" + id_premises);		
	
	document.write(_generateMenu(head, menuItems, currentMenuItem));
    return menuItems;
}

/* Service Supply Submenu */
function writeSSMenu(head,current,id_premises,id_ss) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Detalle Sector Suministro','','',id_ss + ',' + id_premises,'_SSDetail','');
    menuItems[k++] = new menuItem('Servicios Contratados','PF_CC_SS_CONTRACT_SERVICE','premises/PF_CC_SS_CONTRACT_SERVICE', id_ss + ";" + id_ss + ";" + id_premises + "," + id_ss + ",0");
    menuItems[k++] = new menuItem('Lecturas','','', 'SS', '_Readings', id_premises + "," + id_ss + ",0");
    menuItems[k++] = new menuItem('Histórico de Consumo','','',id_ss,'_HistoricalUsage', 'SS' );
    menuItems[k++] = new menuItem('Facturas por Suministro','PF_CF_CC_BILL_NOTES','premises/PF_CF_CC_BILL_NOTES_DETAIL', id_premises + ";" +id_premises + ";" + id_premises + ";" + id_premises );


    document.write(_generateMenu(head, menuItems, current));
    return menuItems;
}


/* Metering Point Submenu */
function writeMPMenu(head,current,id_premises,id_ss,id_pm) {

    var menuItems = new Array();
    var k=0;
    menuItems[k++] = new menuItem('Detalle Punto de Medida','','',id_pm,'_MeterPointDetail',id_ss + ',' + id_premises);
    menuItems[k++] = new menuItem('Lecturas','','', 'MP', '_Readings', id_premises + "," + id_ss + "," + id_pm);

    document.write(_generateMenu(head, menuItems, current));
    return menuItems;
}
/* **********************************************
   CALLING THE REPORT SYSTEM
 ********************************************** */
/* Defines the form to POST */
function defineServletInfo() {
    var output = '<form name="formPost" method="post" action="/servlet/isf.servlets.gcrs.ReporterServlet"  ENCTYPE="text/plain" >' +
        '<input type="hidden" name="xml" value="">'+
        '</form>';
    document.write(output);
}

/* PRIVATED - Executes the post to the servlet */
function of_submit(head,method,parametros,newWindow) {

    var data="";
    headVec = head.split(",");

    dataConMetodo = '<?xml version="1.0" encoding="ISO-8859-1"?><content method="' + method + '" sessionId="' + headVec[0] + '" authorityId="' + headVec[1] + '" user="' + headVec[2] + '" userName="' + headVec[3] + '" language="' + headVec[4] + '" country="' + headVec[5] + '" profileId="' + headVec[6] + '">' + parametros + '</content>';
	dataSinMetodo = '<?xml version="1.0" encoding="ISO-8859-1"?><content sessionId="' + headVec[0] + '" authorityId="' + headVec[1] + '" user="' + headVec[2] + '" userName="' + headVec[3] + '" language="' + headVec[4] + '" country="' + headVec[5] + '" profileId="' + headVec[6] + '">' + parametros + '</content>';
	//alert(typeof(formPost))
	if(typeof(formPost) == "undefined"){
		defineServletInfo();
	}

	if (newWindow != "Null"){
		//alert("Llamada a la funcion 'of_submit()' del customerfolder.js - var newWindow: " + newWindow);
		if (newWindow == "True") {
			formPost.target = "_blank";
		} else {
			formPost.target = "_self";
		}
		//alert("Valor de formPost.xml.value  =  " + data);
		formPost.xml.value = dataConMetodo;
		formPost.submit();
	}else{
		//alert("Llamada a la funcion 'of_submit()' del customerfolder.js - var newWindow: " + newWindow);
		formPost.target = "_blank";
		formPost.xml.value = dataSinMetodo;
		formPost.submit();
		//alert("Llamada a la funcion 'of_submit()' data:  " + data);
	}
	
    return false;
}

/* Calls the report system - Normal way invoking Query System
   Head -> Session Data (separated by commas) session_id, authorityId, user, userName, language, country
   Query -> QuerySystem Method
   Report -> Template Name
   Parametros -> Argument for QuerySystem. ';' separates queries. ',' separates argument inside a query
   newWindow -> True: if you want to open another explorer window (Modal)
                False: don't want to open another explorer window
				Null: don't want load method of query
 */
function of_postReportExtended(head,query,report,parametros,newWindow) {

    var data="";
    blockVec = parametros.split(";");

    if (blockVec[0]!="") {
        for (i=0; i<blockVec.length;i++) {
            argumentVec=blockVec[i].split(",");
            data +="<ArgumentList>";
            for (j=0; j<argumentVec.length;j++) {
                data +='<argument value="'+argumentVec[j]+'" />'
            }
            data+="</ArgumentList>";
        }
    } else {
        data = "<ArgumentList></ArgumentList>";
    }

    data='<Query><method>'+query+'</method>'+data+'<ReportTemplate>'+report+'</ReportTemplate></Query>'
    of_submit(head, 'getReport', data, newWindow);

}

/* Calls the report system - Invokes a bussiness method to get the data.
   Head -> Session Data (separated by commas) session_id, authorityId, user, userName, language, country
   method -> Bussines Method
   Report -> Template Name
   Parametros -> Argument for the bussiness method
   newWindow -> True if you want to open another explorer window */
function of_postMethodExtended(head,servlet,method,report,parametros,newWindow) {
    var data="";
    data = '<ArgumentList>'+parametros+'</ArgumentList><Template>'+report+'</Template><DinamicMethod>'+method+'</DinamicMethod><Servlet>'+servlet+'</Servlet>';

    of_submit(head,'applyMethodTemplateExtended',data,newWindow);
}

/* Calls the report system - Uses an XML to get the data.
   Head -> Session Data (separated by commas) session_id, authorityId, user, userName, language, country
   Report -> Template Name
   Parametros -> Argument for the bussiness method
   newWindow -> True if you want to open another explorer window */
function of_postXMLExtended(head,report,parametros,newWindow) {
    var data="";
    data = parametros + '<ReportTemplate>'+report+'</ReportTemplate>';

    of_submit(head,'applyTemplate',data,newWindow);
}

/* **********************************************
   OPENS TEMPLATES
 ********************************************** */
/* Customer Detail */
function _CustomerDetail(head, customer_id) {
    var data="";

    data = customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id + ";" + customer_id;
    return of_postReportExtended(SessionData, 'CF_CC_RELATIONSHIP_DATA', 'CF_CC_CUSTOMER', data, 'False');
}

/*  ACCOUNT DETAIL */
function _AccountDetail(head, account_id, parametros) {
    var data="";

    data = account_id + ";" + account_id + ";" + account_id + ";" + account_id + ";" + account_id + ";" + account_id + ";" + account_id + ";" + parametros;
    return of_postReportExtended(SessionData, 'CF_CC_ACCOUNT_DETAIL', 'CF_CC_ACCOUNT_DETAIL', data, 'False');
}

/*  BAR LEDGER */
function _BarLedger(head, parametros) {
    var data="";

    data = '<IdPaymentForm>'+parametros+'</IdPaymentForm>';
    return of_postMethodExtended(head, 'isf.servlets.gccb.CollectionMttoServlet','barLedger','gccb/CF_CB_BAR_LEDGER',data,'False');
}

/*  Customer Balance */
function _CustomerBalance(head, parametros) {
    var data="";

    data = '<id_Customer>'+parametros+'</id_Customer>';
    return of_postMethodExtended(head, 'isf.servlets.gccc.cf.CustomerFolderServlet','getCustomerBalance','CF_CC_BALANCE',data,'False');
}
function _CustomerBalanceMora(head, parametros) {
    var data="";

    data = '<id_Customer>'+parametros+'</id_Customer>';
    return of_postMethodExtended(head, 'isf.servlets.gccc.cf.CustomerFolderServlet','getCustomerBalance','gccb/CB_BALANCE_MORA',data,'True');
}

/*  INVOICE DETAIL */
function _InvoiceDetail(head, idInvoice) {
    var data="";
    
    data = '<ID_NOTICE>' + idInvoice + '</ID_NOTICE>';
    return of_postMethodExtended(head, 'isf.servlets.gccb.CollectionMttoServlet','invoiceDetailService','gccb/CB_NOTICE_DETAIL',data,'False');
}

/*  PHOTO TASK DETAIL  */
function _PhotoTaskDetail(head, idTask) {
	var data = "";
	data = idTask;
	//alert("Llamada a la funcion '_PhotoTaskDetail' del customerfolder.js - parametro: " + data);
    return of_postReportExtended(SessionData, 'GCGT_CAR_GET_TASK_PHOTOS','premises/PF_CC_TASK_PHOTO_SLIDER_V3',data,'False');
	//return of_postReportExtended(SessionData, 'GCGT_CAR_GET_TASK_PHOTOS','premises/PF_CC_TASK_PHOTO_VIEWER1',data,'False');
}

/*  
	READING PHOTOS  
	type: 1 = template de fotos de anomalias de lecturas
	      2 = template de fotos de lecturas 
 */
function _PhotoReading(head, data, type) {
	var param = "";	
	var ind1 = 0;
	var ind2 = 0;
	var ind3 = 0;
	var idAnomalous = 0;
	var idReading = 0;
	var fileName = "";
	
	if (type == 1){
		fileName = data;
		ind3 = 1;
		param = ind1 + "," + idAnomalous + "," + ind2 + "," + idReading + "," + ind3 + "," + fileName;
		return of_postReportExtended(SessionData, 'GCGT_RE_GET_ANOMALY_READING_PHOTOS','premises/PF_RE_READING_PHOTO_VIEWER',param,'True');
	}else{
		idReading = data;
		ind2 = 1;
		param = ind1 + "," + idAnomalous + "," + ind2 + "," + idReading + "," + ind3 + "," + fileName;
		return of_postReportExtended(SessionData, 'GCGT_RE_GET_ANOMALY_READING_PHOTOS','premises/PF_RE_DOWNLOAD_READING_PHOTO_VIEWER',param,'False');
	}
	
	//alert("Llamada a la funcion '_PhotoReading' del customerfolder.js - parametro: " + data);
	
}

/*  SHOW TASK PHOTO  */
// function _ShowTaskPhoto(head, idPhoto) {
	// var data = "";
	// data = idPhoto;
	// alert("Llamada a la funcion '_ShowTaskPhoto' del customerfolder.js - parametro: " + data);
	// return of_postReportExtended(head, 'GCGT_CAR_GET_ONE_TASK_PHOTO','premises/PF_CC_SHOW_TASK_PHOTO',data,'true');
// }

/*  Obtiene Dir. Ip SIPRENET  */
function _GetIpSiprenet(cod) {
	var data = "";
	data = cod;
	//alert("Llamada a la funcion '_GetIpSiprenet' del customerfolder.js - parametro: " + data);
	//return of_postReportExtended(SessionData, 'GET_DIR_SIPRENET','premises/PF_SIPRE_BROWSER_SIPRENET',data,'True');
	return of_postReportExtended(head, 'GET_DIR_SIPRENET','premises/PF_SIPRE_BROWSER_SIPRENET',data,'Null');
}

/*Mapa con marca en suministro*/function info_mapa(head,id){    var data = id;    return of_postReportExtended(head, 'PF_CC_UBIC_GEOGRAFICA', 'premises/PF_CC_MAPA', data, 'false');}/* [CAC-30/03/2017] *//* Mapa GeoReferencial con marca en DISTRIBUIDOR - SETA - SUMINISTRO */function info_mapa_seta(head,id){    var data = id;    return of_postReportExtended(head, 'PF_CC_UBIC_GEO_SETA', 'premises/PF_CC_MAPA_SETA', data, 'false');}
/* [CAC-06/04/2017] *//* Mapa GeoReferencial con marca de Historicos de SETAS */function info_mapa_historicos_setas(head,id){	//alert("info_mapa_historicos_setas: " + id);    var data = id;    return of_postReportExtended(head, 'PF_CC_UBIC_GEO_HISTORICOS_SETAS', 'premises/PF_CC_MAPA_HISTORICOS_SETAS', data, 'false');}
/*Informacion de Redes*/
function _InformacionDeRedes(head,idBill){
	var data = idBill;
	return of_postReportExtended(head, 'CF_CC_INFORME_REDES', 'premises/PF_CF_CC_INFORMACION_REDES', data, 'True');
}

/*Informacion de empresas postales*/
function info_empresas_postales(head,id){
	var data = id;
	return of_postReportExtended(head, 'PF_CC_INFORMACION_POSTAL', 'premises/PF_CF_CC_INFORMACION_POSTAL', data, 'True');
}

/*  BILL NOTE DETAIL */
function _BillNoteDetail(head, idBill, parametros) {
    var data="";

    data = '<ID_BILL>' + idBill + '</ID_BILL>' + '<ID_CUSTOMER>' + parametros + '</ID_CUSTOMER>';
    return of_postMethodExtended(head, 'isf.servlets.gccb.CollectionMttoServlet','invoiceBillDetailService','gccb/CB_BILL_NOTICE_DETAIL',data,'False');
}

function _dueNotification (head, idNotice) {
	var data="";

	data = idNotice;
	return of_postReportExtended(head, 'CF_CC_DUE_NOTIFICATION', 'CF_CC_DUE_NOTIFICATION', data, 'True');	

}


/*  BILL NOTE DETAIL */
function _BillNoteDetailFromPremises(head, idBill, parametros) {
    var data="";

    data = '<ID_BILL>' + idBill + '</ID_BILL>' + '<ID_CUSTOMER>' + parametros + '</ID_CUSTOMER>';
    return of_postMethodExtended(head, 'isf.servlets.gccb.CollectionMttoServlet','invoiceBillDetailService','premises/PF_CB_BILL_NOTICE_DETAIL',data,'False');
}


/*  BILL NOTE DETAIL (BY BILL NUMBER) */
function _BillNoteDetailByBillNumber(head, billNumber, parametros) {
    var data="";

    data = '<ID_BILL>0</ID_BILL><BILL_NUMBER>' + billNumber + '</BILL_NUMBER>' + '<ID_CUSTOMER>' + parametros + '</ID_CUSTOMER>';
    return of_postMethodExtended(head, 'isf.servlets.gccb.CollectionMttoServlet','invoiceBillDetailService','gccb/CB_BILL_NOTICE_DETAIL',data,'False');
}

/* HISTORICAL USAGE (GRAPHICAL)  */
function _HistoricalUsage(head, id, parametros) {
    var data="";

    if (parametros="SS") {
        data =  '<idSectorSupply>' + id + '</idSectorSupply><idContractedService>0</idContractedService>';
    }
    else {
        data =  '<idSectorSupply>0</idSectorSupply><idContractedService>' + id + '</idContractedService>';
    }
    return of_postMethodExtended(head, 'isf.servlets.gccom.GccomBillingServlet','billedUsageComparison','CF_CC_BILLED_USED_DISPLAY',data,'True');
}

/*  PREMISES DETAIL */
function _PremisesDetail(head, premises_id) {
    var data="";

    data = premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id + ";" + premises_id  ;
    return of_postReportExtended(SessionData, 'PF_CC_PREMISE_DETAIL', 'premises/PF_CC_PREMISE_DETAIL', data, 'False');
}

/* SERVICE SUPPLY DETAIL */
function _SSDetail(head, ids) {
    var data="";
    idVec = ids.split(",");
    var ss_id = idVec[0];
    var premises_id = idVec[1];

    data = ss_id + ";" + ss_id + ";" + ss_id + ";" + ss_id + ";" + ss_id + ";" + ss_id + ";" + ss_id + ";" + ss_id + ";" + premises_id + ";" + premises_id;
    return of_postReportExtended(SessionData, 'PF_CC_SECTOR_SUPPLY_DETAIL', 'premises/PF_CC_SECTOR_SUPPLY_DETAIL', data, 'False');
}

/*  CONTRACTED SERVICE DETAIL */
function _CSDetail(head, cs_id, parametros) {
    var data="";

    data = cs_id + ";" + cs_id + ";" + cs_id + ";" + cs_id + ";" + cs_id + ";" + cs_id + ";" + cs_id + ";" + parametros;
    return of_postReportExtended(SessionData, 'CF_CC_CONTRACT_SERVICE_DETAIL', 'CF_CC_CONTRACT_SERVICE_DETAIL', data, 'False');
}

/*  RATE DETAIL */
function _RateDetail(head, ids, parametros) {
    var data="";
    idVec = ids.split(",");
    var rate_id = idVec[0];
    var from_date = idVec[1];

    data = rate_id + "," + from_date + ";" + rate_id + ";" + rate_id + ";" + rate_id + "," + from_date + ";" + rate_id + "," + from_date + ";" + rate_id + "," + from_date + ";" + rate_id + "," + from_date + ";" + rate_id + ";" + rate_id + "," + from_date + ";"+ parametros;
    return of_postReportExtended(SessionData, 'CF_CC_RATE_DETAIL', 'CF_CC_RATE_DETAIL', data, 'False');
}

/*  RATE CONCEPT DETAIL */
function _RateConceptDetail(head, id) {
    var data = id + ";" + id + ";" + id;
    return of_postReportExtended(head, 'CF_CC_RATE_CONCEPT', 'CF_CC_RATE_CONCEPT', data, 'True');
}

/*  RATE ADJUSTMENT DETAIL */
function _RateAdjDetail(head, id, parametros) {
    var data="";
    idVec = id.split(",");

    data = idVec[1] + "," + idVec[0] + ";" + idVec[0] + "," + idVec[1] + ";" + idVec[0] + ";" + parametros;
    return of_postReportExtended(head, 'CF_CC_RATE_ADJ_DETAIL', 'CF_CC_RATE_ADJ_DETAIL', data , 'False');
}

/*  RATE ADJUSTMENT CONCEPT DETAIL */
function _RateAdjConceptDetail(head, id) {
    var data = id + ";" + id + ";" + id;
    return of_postReportExtended(head, 'CF_CC_RATE_ADJ_CONCEPT_DETAIL', 'CF_CC_RATE_ADJ_CONCEPT', data, 'True');
}

/*  FIELD ORDER DETAIL */
function _FODetail(head, id_fo, parametros, folder) {
    var data="";
    var page_name="CF_CC_FIELD_ORDER_DETAIL";

    if (folder == "PF") {
        page_name = "premises/PF_CC_FIELD_ORDER_DETAIL";
    }

//    data = id_fo + ";" + id_fo + ";" + id_fo +  ";2300REFTYP," + id_fo + ";" + parametros;
    data = id_fo + ";" + id_fo + ";" + id_fo +  ";" + parametros;
    return of_postReportExtended(head, 'CF_CC_FIELD_ORDER_DETAIL', page_name, data, 'False');
}

/*  SERVICE REQUEST DETAIL */
function _ServReqDetail(head, id_sr, parametros, folder) {
    var data="";
    var page_name="CF_CC_SERVICE_REQUEST_DETAIL";
    if (folder == "PF") {
        page_name="premises/PF_CC_SERVICE_REQUEST_DETAIL";
    }

//    data = id_sr + ";" + id_sr +  ";2000REFTYP," + id_sr +  ";" + parametros;
    data = id_sr + ";" + id_sr +  ";" + parametros;
    return of_postReportExtended(head, 'CF_CC_SERVICE_REQUEST_DETAIL', page_name, data, 'False');
}

/*  FIELD ORDER ACTION POINT DETAIL */
function _ActionPointDetail(head, arguments) {
    arg = arguments.split(";");

    switch (arg[0]) {
        case 'PTOACT0001':
            return _PremisesDetail(head, arg[3] );
            break;
        case 'PTOACT0002':
            return _SSDetail(head, arg[4] + "," + arg[3]);
            break;
        case 'PTOACT0003':
            return _DeviceDetail(head, arg[5], arg[3] + "," + arg[4]);
            break;
        default:
            alert(arg[1]);
    }
}

/* BUDGET PLAN DETAIL */
function _BudgetPlanDetail(head, id) {
    var data="";

    /*data = id + ";" + id +  ";" + parametros;*/
    data = id + ";" + id + ";" + id;
    return of_postReportExtended(head, 'CB_GET_BUDGET_PLAN', 'gccb/CB_BUDGET_PLAN_DETAIL', data, 'False');
}

/* LANDLORD AGREEMENT DETAIL */
function _LLDetail(head, id, parametros) {
    var data="";

    data =  id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + parametros;
    return of_postReportExtended(head, 'CF_CC_LANDLORD_DETAIL', 'CF_CC_LANDLORD_DETAIL', data, 'False');
}

/* READINGS */
function _Readings(head, tipo, ids) {
    var data="";
    idVec = ids.split(",");

    switch (tipo) {
        case 'SS':
            data = idVec[1] + ",0,0,0,0;" + idVec[0] + "," + idVec[1] + ",0"
                break;
        case 'MP':
            data = idVec[1] + ",1," + idVec[2] + ",0,0;" + idVec[0] + "," + idVec[1] + "," + idVec[2]
                break;
        case 'DEV':
            data = idVec[1] + ",0,0,1," + idVec[2] + ";" + idVec[0] + "," + idVec[1] + ","
                break;
        case 'MP_DEV':
            data = idVec[1] + ",1," + idVec[2] + ",1," + idVec[3] + ";" + idVec[0] + "," + idVec[1] + "," + idVec[2]
                break;
        default:
            alert('Readings not defined for ' + tipo);
    }

    data +=  "," + tipo;
    return of_postReportExtended(head, 'PF_CC_READINGS', 'premises/PF_CC_READINGS', data, 'False');
}

/* READING DETAIL */
function _ReadingDetail(head, id, parametros, w) {
    var data = id + ";" + id + ";" + id + ";" + id + ";" + parametros;
    return of_postReportExtended(head, 'PF_CC_READING_DETAIL', 'premises/PF_CC_READING_DETAIL', data, w);
}

/* METER POINT DETAIL */
function _MeterPointDetail(head, id, parametros) {
    var data="";

    data =  id + ";" + id + ";" + id + ";" + id + ";" + parametros + ",0" ;
    return of_postReportExtended(head, 'PF_CC_METER_POINT_DETAIL', 'premises/PF_CC_METER_POINT_DETAIL', data, 'False' );
}

/* DEVICE DETAIL */
function _DeviceDetail(head, id, parametros) {
    var data="";

    data =   id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + parametros + ",0" ;
    return of_postReportExtended(head, 'PF_CC_DEVICE_DETAIL', 'premises/PF_CC_DEVICE_DETAIL', data, 'False' );

}

/* BILL NOTES BY CONTRACTED SERVICE */
function _CSBillNotes(head, id_CS, parametros) {
    var data="";
    idVec = parametros.split(",");

    data =   "0,0," + id_CS + ",0;0,0," + id_CS + ",0;" + "3," + idVec[0] + "," + idVec[1] + "," + id_CS + ",0";
    return of_postReportExtended(head, 'CC_CF_BILL_NOTES', 'CF_CC_BILL_NOTES', data, 'False' );

}

/* SEEDBEED DETAIL */
function _SeedbedDetail(head, id) {
    var data = id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id;
    return of_postReportExtended(head, "CB_SEEDBED_REMITTANCE_DETAIL","gccb/CB_SEEDBED_REMITTANCE_DATA", data, 'False');
}

/* SEEDBEED DETAIL 2 */
function _SeedbedDetail2(head, id) {
    var data = id + ";" + id;
    return of_postReportExtended(head, "CB_SEEDBED_COLLECTION_DATA","gccb/CB_SEEDBED_COLLECTION_DATA", data, 'False');
}

/* DEPOSIT DETAIL */
function _DepositDetail(head, id) {
    var data = id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id + ";" + id;
    return of_postReportExtended(head, 'CF_CB_SUBLEDGER_DEPOSIT_DETAIL', 'gccb/CF_CB_SUBLEDGER_DEPOSIT_DETAIL', data, 'True');
}

/*DOCUMENTOS*/
function _LLamarDocumento(head, idFile) {
    var data="";

    data = '<nombre>'+idFile+'</nombre>'+'<id_file>' + idFile + '</id_file>';
    return of_postMethodExtended(head, 'isf.servlets.gcdoc.NoteServlet','SelectNote','premises/PF_CC_DOCUMENTOS_DETAIL',data,'True');
}

/*Refresh CER */

function _RefreschCerTables(head, id_supply, parametros){
    idVec = parametros.split(",");
	var id_work_request = idVec[0];
	var id_int_afr = idVec[1];
    	
	//alert("_RefreschCerTables - id_supply = " + id_supply + " - id_work_request = " + id_work_request + "id_int_afr = " + id_int_afr );
	//var parametros = id_supply + ";"  + id_supply + ";" + id_supply + "," + id_work_request +  "," + id_int_afr +  ";" + id_supply + "," + id_work_request + ";" + id_supply + "," + id_work_request ; 
	var parametros = id_supply + ";"  + id_supply + ";" + id_supply + "," + id_work_request ; 	
	return of_postReportExtended(head,'CC_CF_CER_TAB','premises/PF_CC_CER_TEMPLATE',parametros,'False');
}

/*  DETALLE DE VISITAS USUARIO WEB */
function _WebUsersConnectionDetailFromPremises(head,parametros,w) {
    //alert("_WebUsersConnectionDetailFromPremises " + parametros + " - " + w);
	//parametros = parametros + ";" + parametros;
    return of_postReportExtended(head, 'PF_CF_CC_WEB_USERS_CONNECTION','premises/PF_CF_CC_WEB_USERS_CONNECTION',parametros,w);
}

/*  DETALLE DE ALTAS WEB */
function _TramitesAltasWebDetailFromPremises(head,parametros,w) {
    //alert("_TramitesAltasWebDetailFromPremises = " + parametros + " - " + w);
	parametros = parametros + ";" + parametros;
    return of_postReportExtended(head, 'PF_CC_TRAMITES_WEB_ALTAS','premises/PF_CF_CC_DETALLES_ALTAS_WEB',parametros,w);
}

/*  DETALLE DE BAJAS WEB */
function _TramitesBajasWebDetailFromPremises(head,parametros,w) {
    //alert("_TramitesBajasWebDetailFromPremises = " + parametros + " - " + w);
	parametros = parametros + ";" + parametros;	
    return of_postReportExtended(head, 'PF_CC_TRAMITES_WEB_ALTAS','premises/PF_CF_CC_DETALLES_BAJAS_WEB',parametros,w);
}

/*  DETALLE DE MODIFICACION DE CLAVE WEB */
function _TramitesModifClaveWebDetailFromPremises(head,parametros,w) {
    //alert("_TramitesModifClaveWebDetailFromPremises = " + parametros + " - " + w);
	parametros = parametros + ";" + parametros;	
    return of_postReportExtended(head, 'PF_CC_DETALLE_MODIF_CLAVE_WEB','premises/PF_CC_DETALLE_MODIF_CLAVE_WEB',parametros,w);
}

/*  DETALLE DE VISITAS USUARIO WEB */
function _TramitesDistribucionWebDetailFromPremises(head,parametros,w) {
    //alert("_TramitesDistribucionWebDetailFromPremises = " + parametros + " - " + w);
	parametros = parametros + ";" + parametros;	
    return of_postReportExtended(head, 'PF_CF_CC_DISTRIBUCION_WEB','premises/PF_CC_DISTRIBUCION_WEB',parametros,w);
}

function _WebDistributionBillDetail(head,parametros,w) {
	//alert("_WebDistributionBillDetail = " + parametros + " - " + w);
    return of_postReportExtended(head, 'PF_CC_DISTRIBUCION_FACTURAS','premises/PF_CC_DISTRIBUCION_FACTURAS',parametros,w);
}

function _WebNotificationMail(head,parametros,w) {
	//alert("_WebNotificationMail = " + parametros + " - " + w);
    return of_postReportExtended(head, 'PF_CC_NOTIFICATION_MAIL','premises/PF_CC_NOTIFICATION_MAIL',parametros,w);
}

function _NotificationLetter(head,parametros,w) {
	//alert("_NotificationLetter = " + parametros + " - " + w);
    return of_postReportExtended(head, 'PF_CC_NOTIFICATION_LETTER','premises/PF_CC_NOTIFICATION_LETTER',parametros,w);
}

function _WebEstadoCuenta(head,parametros,w) {
	//alert("_WebEstadoCuenta = " + parametros + " - " + w);
    return of_postReportExtended(head, 'PF_CC_ESTADO_CUENTA_WEB','premises/PF_CC_ESTADO_CUENTA_WEB',parametros,w);
};

function _DefaultMovimientosCer(head,parametros,w) {
    return of_postReportExtended(head, 'CC_CF_DEFAULT_MOVIMIENTOS_CER','premises/CC_CF_DEFAULT_MOVIMIENTOS_CER',parametros,w);
};

function _DefaultOtrasFincasCer(head,parametros,w) {
	idVec = parametros.split(",");
	var id_work_request = idVec[1];
	var id_supply = idVec[0];
	var parametros = id_supply ; //+ "," + id_work_request ; 
	//alert("Parametros = " + parametros);
	return of_postReportExtended(head, 'CC_CF_DEFAULT_OTRAS_FINCAS_CER','premises/CC_CF_DEFAULT_OTRAS_FINCAS_CER',parametros,w);
};

function _MovimientosCer(head,parametros,w) {
	idVec = parametros.split(",");
	var id_work_request = idVec[1];
	var id_supply = idVec[0];
	var parametros = id_supply + "," + id_work_request ; 	
    return of_postReportExtended(head, 'CC_CF_MOVIMIENTOS_CER','premises/CC_CF_MOVIMIENTOS_CER',parametros,w);
};

function _OtrasFincasCer(head,parametros,w) {
	idVec = parametros.split(",");
	var id_work_request = idVec[1];
	var id_supply = idVec[0];
	var parametros = id_supply + "," + id_work_request ; 
	//alert("Parametros = " + parametros);
	return of_postReportExtended(head, 'CC_CF_OTRAS_FINCAS_CER','premises/CC_CF_OTRAS_FINCAS_CER',parametros,w);
};

function _FacturasFincasCer(head,parametros,w) {
	//alert("Parametros = " + parametros);
	return of_postReportExtended(head, 'CC_CF_FACTURAS_FINCAS_CER','premises/CC_CF_FACTURAS_FINCAS_CER',parametros,w);
};

/* NOTE DETAIL Anafes - Unicef 
function _NoteDetailFromPremisesAnafes(head, parametros, w) {
    return of_postReportExtended(head, 'PF_CC_DETALLES_ANAFES','premises/PF_CC_DETALLES_ANAFES',parametros,w);
}*/
/* NOTE DETAIL Anafes - Unicef */function _NoteDetailFromPremisesUnicef(head, parametros, w) {    return of_postReportExtended(head, 'PF_CC_DETALLES_UNICEF','premises/PF_CC_DETALLES_UNICEF',parametros,w);}
