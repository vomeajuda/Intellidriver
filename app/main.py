import obd
import time
import os
import csv
from datetime import datetime

print('Conectando')
conexaoOBD = obd.OBD('com4')

now = datetime.now()
str_time = now.strftime('%d-%m-%Y_%H-%M-%S')

rotacoesCmd = obd.commands.RPM
velocidadeCmd = obd.commands.SPEED
temperaturaCmd = obd.commands.COOLANT_TEMP
combustivelCmd = obd.commands.FUEL_LEVEL

with open ('../../data/data_'+str_time+'.csv', 'w', newline='') as csvfile:
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, dialect='excel')
    
    writer.writeheader()

    while True:
        rotacoesRec = conexaoOBD.query(rotacoesCmd)
        velocidadeRec = conexaoOBD.query(velocidadeCmd)
        temperaturaRec = conexaoOBD.query(temperaturaCmd)
        combustivelRec = conexaoOBD.query(combustivelCmd)

        print("RPM: " + str(rotacoesRec.magnitude))
        print("Velocidade: " + str(velocidadeRec.magnitude))
        print("Temperatura: " + str(temperaturaRec.magnitude))
        print("Combustivel: " + str(combustivelRec.magnitude))
        
        now = datetime.now();
        str_time = now.strftime("%H-%M-%S")
        
        writer.writerow({
            'time': str_time,
            'rpm': str(rotacoesRec.magnitude), 
            'velocidade': str(velocidadeRec.magnitude), 
            'temperatura': str(temperaturaRec.magnitude), 
            'combustivel': str(combustivelRec.magnitude)
            })

        time.sleep(1)

        # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

        # with open(nome_arquivo, 'a+') as arquivo:
        #     arquivo.write(dados)

        clear = lambda: os.system('cls')
        clear()