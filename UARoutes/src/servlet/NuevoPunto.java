package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@SuppressWarnings("serial")
public class NuevoPunto extends HttpServlet{
	@Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
		
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		String userName = req.getUserPrincipal().getName();
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		Key userKey = KeyFactory.createKey("Usuario", userName);
		
		String nombreR = req.getParameter("nombreR");
		String nombreP = req.getParameter("nombreP");
		String desc = req.getParameter("desc");
		String lat = req.getParameter("lat");
		String lng = req.getParameter("lng");
		String pos = req.getParameter("pos");
	    String message = "";
	     
	    if(nombreR == null || nombreR.equals(""))
	    	 message = "No hay nombre de ruta";
	    
	    else if(nombreP == null || nombreP.equals(""))
	    	message = "No hay nombre del punto";
	    
	    else if(desc == null || desc.equals(""))
	    	message = "No hay descripcion para el punto";
	    
	    else if(lat == null || lat.equals(""))
	    	message = "El punto no tiene latitud";
	    
	    else if(lng == null || lng.equals(""))
	    	message = "El punto no tiene longitud";
	    
	    else if(pos == null || pos.equals(""))
	    	message = "El punto no tiene posición en la ruta";	    
	     
	    else{
	    	Filter rutaFilter = new FilterPredicate("nombreRuta", FilterOperator.EQUAL, nombreR);
			Filter puntoFilter = new FilterPredicate("nombrePunto", FilterOperator.EQUAL, nombreP);
			Filter compuesto = CompositeFilterOperator.and(rutaFilter, puntoFilter);
			
			Query q = new Query("Punto").setFilter(compuesto).setAncestor(userKey);
			PreparedQuery pq = datastore.prepare(q);
	        
			Entity result = pq.asSingleEntity();
			
			if(result == null){
				Entity newpunto = new Entity("Punto", userKey);
	    	    newpunto.setProperty("nombreRuta", nombreR);
	    	    newpunto.setProperty("nombrePunto", nombreP);
	    	    newpunto.setProperty("descripcion", desc);
	    	    newpunto.setProperty("lat", lat);
	    	    newpunto.setProperty("lng", lng);
	    	    newpunto.setProperty("posicion", pos);
	    	    datastore.put(newpunto);
			}
			else
				message = "Ya existe ese punto en esa ruta";
	 }
	     
	     if(message.equals(""))
	    	   resp.getWriter().print("{\"result\": {\"nombreR\": \"" + nombreR + "\", \"nombreP\": \"" + nombreP + "\", \"descripcion\": \"" + desc + "\", \"lat\": \"" + lat + "\", \"lng\": \"" + lng + "\", \"posicion\": \"" + pos + "\"}}");
	     else
	    	   resp.getWriter().print("{\"error\": {\"message\": \"" + message + "\"}}");
	}
}
