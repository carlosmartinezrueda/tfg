package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;

@SuppressWarnings("serial")
public class BuscarPuntos extends HttpServlet {
    @SuppressWarnings("deprecation")
	@Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
                throws IOException, ServletException {
    	
    	resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
	     
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
	    
	    String nombreRuta  = req.getParameter("nombreRuta");
	     
	    Query q = new Query("Punto")
        .setFilter(new FilterPredicate("nombreRuta", FilterOperator.EQUAL, nombreRuta));
	    
	    PreparedQuery pq = datastore.prepare(q);
	    int numrutas = 0;
	    
	    numrutas = pq.countEntities();
        
		if(numrutas < 1)
			resp.getWriter().print("{\"error\": {\"message\": \"Se necesitan, al menos, 2 puntos para la ruta\"}}");
		
		else{     
			resp.getWriter().print("{\"result\": {\"message\": \"Exist el punto\"}}");
		}
        
    }

}
