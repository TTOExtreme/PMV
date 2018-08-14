<%
String msg = "";
boolean show = true;
if("RGF".equals(request.getParameter("cmd"))){
    java.sql.Connection cn = com.sil.util.Bd.getConexao();
    java.sql.Statement st = cn.createStatement();
 
    String rgf = nullToVazio(request.getParameter("rgf"));
	String sScript = "";
    if(!"".equals(rgf)){
		show = false;
        com.sun.rowset.CachedRowSetImpl crs = com.sil.util.Query.executeSelect("SELECT nmpessoa = UPPER(x.nomefunciona), rgf = x.matricfunci, cdlogin = t.Usr "
                                                                              +"  FROM rat00900 x, "+config.getServletContext().getInitParameter("Usuarios")+" t "
																			  +" WHERE x.idlogin = t.IdUsr "
																			  +"   AND UPPER(x.matricfunci) = "+ com.sil.util.Query.toSQL(rgf.toUpperCase(), com.sil.util.Query.Text_TYPE), st);
        if (crs.next()){
            sScript = " document.getElementById('usuario').value = '"+crs.getString("cdlogin")+"'; "
			        + " document.getElementById('nomeusr').innerHTML = '"+crs.getString("nmpessoa").trim()+"'; "
			        + " document.getElementById('bemvindo').innerHTML = 'BEM VINDO !'";

			out.print(sScript);
			out.flush();
			close(st, cn);
	    }else{
			sScript = "alert('RGF nao identificado. Por favor, entre em contato com suporte.'); "
			        + "document.getElementById('nomeusr').innerHTML = ''; "
			        + "document.getElementById('bemvindo').innerHTML = ''; "
			        + "document.getElementById('rgf').value = ''; "
					+ "document.getElementById('rgf').focus(); "
					+ "document.getElementById('usuario').value = ''; ";
			out.print(sScript);
			out.flush();
			close(st, cn);
			msg = "RGF Inv&aacute;lido";
		}
	}else{
       sScript = "alert('RGF nao identificado. Por favor, entre em contato com suporte!');  "
		       + "document.getElementById('usuario').focus();";
	   out.print(sScript);
       out.flush();
	}
}else if ("entrar".equals(request.getParameter("cmd"))){
    
    String address = "";
    java.sql.Connection cn = com.sil.util.Bd.getConexao();
    java.sql.Statement st = cn.createStatement();

    String rgf     = nullToVazio(request.getParameter("rgf"));
    String usuario = nullToVazio(request.getParameter("usuario"));
    String senha   = nullToVazio(request.getParameter("senha")).toUpperCase();
 
    com.sun.rowset.CachedRowSetImpl crs = com.sil.util.Query.executeSelect("SELECT rgf = x.matricfunci, t.* "
                                                                          +"  FROM rat00900 x, "+config.getServletContext().getInitParameter("Usuarios")+" t "
																	      +" WHERE x.idlogin = t.IdUsr "
																		  +"   AND UPPER(t.usr) = "+com.sil.util.Query.toSQL(usuario.toUpperCase(), com.sil.util.Query.Text_TYPE), st);
																			  
    if (crs.next()){
        if ((com.sil.util.Global.criptografia(senha).equals(nullToVazio(crs.getString("senhausrjava")).trim()))&&(!"".equals(nullToVazio(crs.getString("senhausrjava")).trim()))){
			if("N".equals(crs.getString("LoginBloqueadoUsr"))){
				session.invalidate();
				
				String[] tarefaInicial = nullToVazio(crs.getString("tarefainicialusrjava")).split(",");
				
				String tarefa = "";
				String tipoTarefa = "";
				
				if (tarefaInicial.length >=2){
					tarefa = tarefaInicial[0].trim();
					tipoTarefa = tarefaInicial[1].trim();
				}
				else{
					if ("".equals(tarefaInicial[0].trim())) tarefa = "SMARrh";
					else tarefa = tarefaInicial[0].trim();
					tipoTarefa = "Menu";
				}

				com.sil.util.Menu menu = new com.sil.util.Menu(crs.getString("usr"));
				
				com.sil.util.Parametro user = new com.sil.util.Parametro();
				user.put("usr", crs.getString("usr"));
				user.put("rgf", crs.getString("rgf"));
				user.put("senha", (crs.getString("senhausrjava") != null ? crs.getString("senhausrjava").trim() : null));
				user.putInt("nivelusr", crs.getInt("nivelusr"));
				user.put("estilo", (com.sil.util.Global.isEmpty(crs.getString("estilo")) ? "system/default" : crs.getString("estilo")));
                user.put("telalogin", request.getRequestURL().toString());
				
				if ("Menu".equalsIgnoreCase(tipoTarefa)){
					menu.setContext(request.getContextPath());
					menu.setSistema(tarefa);
					tarefa = "RFPW00000";
					
				}
				user.put("tarefainicialusr", tarefa);
				session = request.getSession();
				
				session.setAttribute("user", user);
				session.setAttribute("menu", menu);
				
				request.setAttribute("cmd", "finalizar");
				request.setAttribute("parametros", "execobj,"+tarefa);
				
				close(st, cn);
				RequestDispatcher dispatcher = request.getRequestDispatcher("/servlet/controle");
				dispatcher.forward(request, response);
			}
			else{
			   close(st, cn);
               msg = "Usu&aacute;rio Bloqueado!";
			}
        }
        else{
            close(st, cn);
            msg = "Senha Inv&aacute;lida";
        }
    }
    else{
        close(st, cn);
        msg = "Usu&aacute;rio Inv&aacute;lido";
    }
}
%>
<%
if(show){
%>
<html>
   <head><title><%=config.getServletContext().getInitParameter("Titulo")%></title>

<script id='_jsCommon' language='javascript' src='<%=request.getContextPath()%>/includes/system/jsCommon.jsp' tipo='script'> 
</script>
<script id='_jsSubmit' language='javascript' src='<%=request.getContextPath()%>/includes/system/jsSubmit.jsp' tipo='script'> 
</script>
</head>
<script language="javascript">
document.onkeydown = checkKey;

function checkKey(evt){
    var code = 0;
    if (evt == null) code = event.keyCode;
    else code = evt.keyCode;
        
    if (code == 13) finalizar();
}
function inicializa(){
    var usr = document.getElementById("rgf");
    usr.focus();
}
function finalizar(){
    var oCmd = document.getElementById("cmd");
    oCmd.setAttribute("value", "entrar");
    document.form.submit();
}
function fechar(){
    if (window.opener) window.close();
    else setTimeout("history.go(-1);",0); 
}
function checkRGF(req){
	buscRGF(null, "RGF", null, null, fillText);
}
function fillText(req){
    var txt = req.responseText;
	eval(txt);
}
function buscRGF(obj, comando, parametros, objetos){
    if(document.getElementById("rgf").value != ""){
		var f = document.getElementById("form");
		var send = "cmd="+nullToEmpty(comando)+"&parametros="+nullToEmpty(parametros)+"&submitedType=fastSubmit";
		   
		obj = _checkSubmitGroup(obj);
		send += "&tag="+(obj ? obj.getAttribute("id") : "");
		if (objetos && document.getElementById("obj")) send += "&obj="+document.getElementById("obj").value;

		req = newXMLHttpRequest();
		var handlerFunction = getReady(req, arguments[4]);

		req.onreadystatechange = handlerFunction;
		req.open("POST", "<%=request.getContextPath()%>/SMARrh.jsp", true);

		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=<%=com.sil.servlets.ControleServ.getPropertyAplication("CharacterEncoding")%>");

		var oObj = getObjetos(objetos);
		for (var i=0; i<oObj.length; i++){
			var aDados = oObj[i].split("/*@@*/");
			send +="&"+aDados[0]+"="+toURL(aDados[1]);
		}

		var show = "geral";
		if (comando == "getPage" || comando == "navegacao"){
			var sPai = "";
			if (comando == "getPage")  sPai = parametros;
			else if (comando == "navegacao")  sPai = (parametros.split(","))[1];
			show = sPai;
		}

		req.send(send);
		return req;
	}else{
		document.getElementById('nomeusr').innerHTML = '';
		document.getElementById('bemvindo').innerHTML = '';
	}
}
</script>
<style>
.textoPreto{
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: normal;
    color: #000000;
}
.textoBem{
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 8px;
    font-style: normal;
    font-weight: bold;
    color: #0000FF;
}
input{
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-style: normal;
	border: 1px solid #9F9F9F;
	height: 18px;
}
.infLogo{
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: bold;
    color: #000000;
    background-color: #FFFFFF;
}
.navButton{
    cursor: default;
    border: 0px;
    width: 30px;
    height: 21px;
	padding:0px;
}
.textoButton {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: bold;
    color: #000000;
}
.textoErro {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 10px;
    font-style: normal;
    font-weight: bold;
    color: #DD0000;
}
</style>
<body onLoad="inicializa();">
    <table cellspacing="0" cellpadding="0" align="center" width="100%" height="100%">
        <tr>
            <td valign="middle" align="center">
                <noscript>ERROR: Please activate JavaScript.</noscript>
                <table cellspacing="0" cellpadding="0" align="center" style="border: 1px solid #000000; background-color:#F7F7F7">
                    <tr>
                        <td valign="middle">
							<table cellspacing="0" cellpadding="0" border="0" width="100%" height="75px" style="background-image: url(imagens/banner.jpg)">                       
								<tr>
									<td align="right" valign="bottom"></td>
								</tr>
							</table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                          <form id="form" name="form" method="POST" action="<%=request.getContextPath()%>/SMARrh.jsp">
						  <input type="hidden" name="cmd" id="cmd" value="">
                          <table width="590" height="165" border="0" align="center" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" valign="top" colspan="2"><font class="textoPreto">Utilize o formulario abaixo para logar no sistema</font></td>
                            </tr>
                            <%if (msg != null){%>
                            <tr>
                              <td align="center" height="2	0" colspan="2" valign="center"><font class="textoErro"><%=msg%></font></td>
                            </tr>
                            <%}
                            else{%>
                            <tr>
                              <td align="center" height="20"></td>
                            </tr>
                            <%}%>
                            <tr>
                                <td width="100%">
                                    <table align="center">
                                    	<tr>
                                           <td id="bemvindo" align="center" colspan="3"><font class="textoPreto"> </font></td>	
                                        </tr>
                                        <tr>
                                          <td id="nomeusr" align="center" colspan="3"><font class="textoPreto"> </font></td>	
                                        </tr>
									    <tr>
                                          <td width="51" align="right"><font class="textoPreto">Matrícula:</font></td>
                                          <td width="10"></td>
                                          <td width="169"><input type="text" id="rgf" name="rgf" class="textfield" onBlur="checkRGF();"></td>
								      </tr>
									    <tr>
                                          <td align="right"><font class="textoPreto">Usu&aacute;rio :</font></td>
                                          <td width="10"></td>
                                          <td><input type="text" id="usuario" name="usuario" class="textfield"></td>
									    </tr>
                                        <tr>
                                          <td align="right"><font class="textoPreto">Senha :</font></td>
                                          <td width="10"></td>
                                          <td><input type="password" name="senha" class="textfield"></td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table align="left">
                                        <tr>
                                          <td>
                                            <button class="navButton" id='closebuttons1btOk' onClick="finalizar();" style="width: 85px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td>
                                                    <img id='closebuttons1btOkImagem' parent='closebuttons1' src='<%=request.getContextPath()%>/imagens/system/confirmar.png'/>
                                                </td>
                                                <td class="textoButton">Confirmar</td>
                                            </tr>
                                            </table>    
                                            </button>
                                          </td>
                                        </tr>  
                                        <tr>
                                          <td>
                                            <button class="navButton" id='closebuttons1btCancel' onClick="fechar();" style="width: 85px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td>
                                                    <img id='closebuttons1btCancelImagem' parent='closebuttons1' src='<%=request.getContextPath()%>/imagens/system/cancelar.png'/>
                                                </td>
                                                <td class="textoButton">Cancelar</td>
                                            </tr>
                                            </table>
                                            </button>
                                          </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                          </table>
						  </form>
                        </td>
                    </tr>                    
                </table>
            </td>            
        </tr>
    </table>
</body>
</html>
<%}%>
<%!
    String nullToVazio(String str){
        if (str == null) str = "";
        return str;
    }
    void close(java.sql.Statement st, java.sql.Connection cn){
        try{ if (st != null) st.close(); }catch(Exception e){}
        try{ if (cn != null) cn.close(); }catch(Exception e){}
    }

%>
