import obd
import time
import os
import csv
from datetime import datetime

nome_arquivo = 'dados.txt'
dados = ''
print('Conectando')
conexaoOBD = obd.OBD('com4')

time = datetime.now
time.strftime('%d-%m-%Y_%H-%M-%S')

with open ('../data/data_'+time, 'w', newline='') as csvfile:
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    
    writer.writeheader()

while True:

    rotacoesCmd = obd.commands.RPM
    velocidadeCmd = obd.commands.SPEED
    temperaturaCmd = obd.commands.COOLANT_TEMP
    combustivelCmd = obd.commands.FUEL_LEVEL
        
    rotacoesRec = conexaoOBD.query(rotacoesCmd)
    velocidadeRec = conexaoOBD.query(velocidadeCmd)
    temperaturaRec = conexaoOBD.query(temperaturaCmd)
    combustivelRec = conexaoOBD.query(combustivelCmd)
    
    now = datetime.now

    print("RPM: " + str(rotacoesRec))
    print("Velocidade: " + str(velocidadeRec))
    print("Temperatura: " + str(temperaturaRec))
    print("Combustivel: " + str(combustivelRec))
    
    with open ('../data/data_'+time, 'w', newline='') as csvfile:
        writer.writerow({
            'time': str(now),
            'rpm': str(rotacoesRec), 
            'velocidade': str(velocidadeRec), 
            'temperatura': str(temperaturaRec), 
            'combustivel': str(combustivelRec)
            })

    time.sleep(1)

    # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

    # with open(nome_arquivo, 'a+') as arquivo:
    #     arquivo.write(dados)

    clear = lambda: os.system('cls')
    clear()