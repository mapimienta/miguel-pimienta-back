package common;

import java.util.Scanner;
import java.util.HashSet;

public class CubeSummationInJava {
   
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int T = in.nextInt();                

        HashSet<Save> save = new HashSet<Save>();
        for (int a = 0; a < T ; a++) {
            int n = in.nextInt();
            int m = in.nextInt();            

            save.removeAll(save);
            for (int b = 0; b < m; b++) {
                int x1, y1, z1 = 0;
                int x2, y2, z2 = 0;
                String tq = in.next();
                if (tq.equals("UPDATE")) {
                    x1 = in.nextInt();
                    y1 = in.nextInt();
                    z1 = in.nextInt();
                    long w = in.nextLong();
                    
                    Save s = new Save(x1,y1,z1,w);  
                    save.remove(s);
                    if(s.numero!=0)
                        save.add(s);
                    
                } else if (tq.equals("QUERY")) {
                    x1 = in.nextInt();
                    y1 = in.nextInt();
                    z1 = in.nextInt();
                    x2 = in.nextInt();
                    y2 = in.nextInt();
                    z2 = in.nextInt();
                    long suma = 0;

                    for (Save upd:save){
                        if(
                                (upd.x>=x1 && upd.x <= x2)&&
                                (upd.y>=y1 && upd.y <= y2)&&
                                (upd.z>=z1 && upd.z <= z2)
                                ){
                            suma = suma + upd.numero;
                        }
                    }
                    
                    System.out.println(suma);
                    
                }
            }
        }
    }
    
    static class Save{
        int x,y,z;
        long numero;
        
        public Save(int x, int y, int z, long numero){
            this.x = x;
            this.y = y;
            this.z = z;
            this.numero = numero;
        }

        @Override
        public int hashCode(){
            int hashcode = 0;
            hashcode += x*20;
            hashcode += y*20;
            hashcode += z*20;
            return hashcode;
        }
        @Override
        public boolean equals(Object obj){

            if(obj instanceof Save){
                Save sa = (Save)obj;
                return (sa.x == this.x && sa.y == this.y && sa.z == this.z);
            }else{
                return false;
            }
        }
    }
}
