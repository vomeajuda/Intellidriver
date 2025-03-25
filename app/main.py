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
    fieldnames = ['time', 'rpm', 'velocidade', 'temperatura', 'combustivel', 'Status', 'Engine_Load', 'Posicao_Acelerador', 'Absolute_Load', 'Tipo_Combustivel', 'Temperatura_Oleo', 'L/h']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames, dialect='excel')
    
    writer.writeheader()

    while True:
        rpm_res = conexaoOBD.query(obd.commands.RPM)
        speed_res = conexaoOBD.query(obd.commands.SPEED)
        temp_res = conexaoOBD.query(obd.commands.COOLANT_TEMP)
        fuel_res = conexaoOBD.query(obd.commands.FUEL_LEVEL)
        load_res = conexaoOBD.query(obd.commands.ENGINE_LOAD)
        throttle_res = conexaoOBD.query(obd.commands.THROTTLE_POS)
        absload_res = conexaoOBD.query(obd.commands.ABSOLUTE_LOAD)
        type_res = conexaoOBD.query(obd.commands.FUEL_TYPE)
        oil_res = conexaoOBD.query(obd.commands.OIL_TEMP)
        rate_res = conexaoOBD.query(obd.commands.FUEL_RATE)
        
        try:
            rpm_num = str(rpm_res.value.magnitude)
        except:
            rpm_num = "undefined"
        try:
            speed_num = str(speed_res.value.magnitude)
        except:
            speed_num = "undefined"
        try:
            temp_num = str(temp_res.value.magnitude)
        except:
            temp_num = "undefined"
        try:
            fuel_num = str(fuel_res.value.magnitude)
        except:
            fuel_num = "undefined"
        try:
            load_num = str(load_res.value.magnitude)
        except:
            load_num = "undefined"
        try:
            throttle_num = str(throttle_res.value.magnitude)
        except:
            throttle_num = "undefined"
        try:    
            absload_num = str(absload_res.value.magnitude)
        except:
            absload_num = "undefined"
        try:
            type_num = str(type_res.value)
        except:
            type_num = "undefined"
        try:
            oil_num = str(oil_res.value.magnitude)
        except:
            oil_num = "undefined"
        try:
            rate_num = str(rate_res.value.magnitude)
        except:
            rate_num = "undefined"

        print("RPM: " + rpm_num)
        print("Velocidade: " + speed_num)
        print("Temperatura: " + temp_num)
        print("Combustivel: " + fuel_num)
        print("Engine Load: " + load_num)
        print("Posicao Acelerador: " + throttle_num)
        print("Absolute Load: " + absload_num)
        print("Tipo Combustivel: " + type_num)
        print("Temperatura Oleo: " + oil_num)
        print("L/h: " + rate_num)
        
        now = datetime.now();
        str_time = now.strftime("%H-%M-%S")
        
        writer.writerow({
            'time': str_time,
            'rpm': rpm_num, 
            'velocidade': speed_num, 
            'temperatura': temp_num, 
            'combustivel': fuel_num,
            'Engine_Load': load_num,
            'Posicao_Acelerador': throttle_num,
            'Absolute_Load': absload_num,
            'Tipo_Combustivel': type_res,
            'Temperatura_Oleo': oil_num,
            'L/h ': rate_num
            })

        time.sleep(1)

        # dados = "Date/Time: " + str(agora) + "\nRPM:" + str(rotacoesRec) + "\nVelocidade: " + str(velocidadeRec) + "\nTemperatura:" + str(temperaturaRec) + "\nCombutível:" + str(combustivelRec) + "\n \n" 

        # with open(nome_arquivo, 'a+') as arquivo:
        #     arquivo.write(dados)

        clear = lambda: os.system('cls')
        clear()