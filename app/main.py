import obd
import time
import os
import csv
from datetime import datetime

print('Conectando')
conexaoOBD = obd.OBD('com4')

now = datetime.now()
str_time = now.strftime('%d-%m-%Y_%H-%M-%S')

with open ('../data/data_'+str_time+'.csv', 'w', newline='') as csvfile:
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, dialect='excel')
    
    writer.writeheader()

    while True:
        rpm_res = conexaoOBD.query(obd.commands.RPM)
        speed_res = conexaoOBD.query(obd.commands.SPEED)
        temp_res = conexaoOBD.query(obd.commands.COOLANT_TEMP)
        fuel_res = conexaoOBD.query(obd.commands.FUEL_LEVEL)
        
        rpm_num = str(rpm_res.value.magnitude)
        speed_num = str(speed_res.value.magnitude)
        temp_num = str(temp_res.value.magnitude)
        fuel_num = str(round(fuel_res.value.magnitude, 3))

        print("RPM: " + rpm_num)
        print("Velocidade: " + speed_num)
        print("Temperatura: " + temp_num)
        print("Combustivel: " + fuel_num)
        
        now = datetime.now();
        str_time = now.strftime("%H-%M-%S")
        
        writer.writerow({
            'time': str_time,
            'rpm': rpm_num, 
            'velocidade': speed_num, 
            'temperatura': temp_num, 
            'combustivel': fuel_num
            })

        time.sleep(1)

        # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

        # with open(nome_arquivo, 'a+') as arquivo:
        #     arquivo.write(dados)

        clear = lambda: os.system('cls')
        clear()