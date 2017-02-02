package common;

import java.util.Scanner;
import java.util.HashSet;

public class CubeSummation {
    static HashSet<Save> save = new HashSet<Save>();
    public static void main(String[] args) {        
        save.removeAll(save);
    }
    
    public static void clearSave(){
        save.removeAll(save);
    }
    
    public static void update(int x1, int y1, int z1, long w){
        Save s = new Save(x1, y1, z1, w);
        save.remove(s);
        if (s.numero != 0) {
            save.add(s);
        }        
    }
    
    public static long query(int x1, int y1, int z1, int x2, int y2, int z2){
        long suma = 0;

        for (Save upd : save) {
            if ((upd.x >= x1 && upd.x <= x2)
                    && (upd.y >= y1 && upd.y <= y2)
                    && (upd.z >= z1 && upd.z <= z2)) {
                suma = suma + upd.numero;
                System.out.println(upd.x+","+upd.y+","+upd.z);
                System.out.println(suma);
            }
        }
        return suma;        
    }

    static class Save {

        int x, y, z;
        long numero;

        public Save(int x, int y, int z, long numero) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.numero = numero;
        }

        @Override
        public int hashCode() {
            //System.out.println("In hashcode");
            int hashcode = 0;
            hashcode += x * 20;
            hashcode += y * 20;
            hashcode += z * 20;
            return hashcode;
        }

        @Override
        public boolean equals(Object obj) {
            //System.out.println("In equals");
            if (obj instanceof Save) {
                Save sa = (Save) obj;
                return (sa.x == this.x && sa.y == this.y && sa.z == this.z);
            } else {
                return false;
            }
        }
    }
}
