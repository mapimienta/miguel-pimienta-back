<%@page import="common.CubeSummation"%>
<%
    CubeSummation cs = new CubeSummation();
    if(request.getParameter("accion").equals("update")){
            cs.update(Integer.valueOf(request.getParameter("x1")),Integer.valueOf(request.getParameter("y1")),
                    Integer.valueOf(request.getParameter("z1")),Integer.valueOf(request.getParameter("w")));
            out.print("{success:true}");            
    }else{
        if(request.getParameter("accion").equals("query")){
            out.print(cs.query(Integer.valueOf(request.getParameter("x1")),Integer.valueOf(request.getParameter("y1")),
                    Integer.valueOf(request.getParameter("z1")),Integer.valueOf(request.getParameter("x2")),
                    Integer.valueOf(request.getParameter("y2")),Integer.valueOf(request.getParameter("z2"))));
        }else{
            if(request.getParameter("accion").equals("clearSave")){
                cs.clearSave();
                out.print("{success:true}");
            }
        }
    }
    
    %>
